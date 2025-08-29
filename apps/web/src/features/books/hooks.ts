import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { TBookRow } from '@packages/validations';
import { createBook, fetchBooks, setBookRead } from '@/api/book.service';
import { useSnackbar } from '@/hooks/useSnackbar';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
}

export function useCreateBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });
}

export function useToggleRead() {
  const { showSnackbar } = useSnackbar();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, read }: { id: number; read: boolean }) => setBookRead(id, read),
    onMutate: async ({ id, read }) => {
      await qc.cancelQueries({ queryKey: ['books'] });
      const previous = qc.getQueryData<TBookRow[]>(['books']);
      qc.setQueryData<TBookRow[]>(['books'], (old) =>
        old ? old.map((b) => (b.id === id ? { ...b, read } : b)) : old,
      );
      return { previous };
    },
    onSuccess: () => {
      showSnackbar('Book updated', 'success');
    },
    onError: (_e, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(['books'], ctx.previous);
      showSnackbar('Failed to update book', 'error');
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });
}
