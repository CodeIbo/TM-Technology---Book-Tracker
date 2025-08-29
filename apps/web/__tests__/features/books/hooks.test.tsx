import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useToggleRead } from '@/features/books/hooks';

const m = vi.hoisted(() => ({
  setBookRead: vi.fn(),
  showSnackbar: vi.fn(),
}));

vi.mock('@/api/book.service', () => ({ setBookRead: m.setBookRead }));
vi.mock('@/hooks/useSnackbar', () => ({ useSnackbar: () => ({ showSnackbar: m.showSnackbar }) }));

function setup(
  initial = [
    { id: 1, title: 'A', author: 'B', read: false },
    { id: 2, title: 'C', author: 'D', read: false },
  ],
) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
  qc.setQueryData(['books'], initial);
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
  return { qc, wrapper };
}

beforeEach(() => vi.clearAllMocks());

describe('useToggleRead (unit)', () => {
  it('sets read and shows success on resolve', async () => {
    const { qc, wrapper } = setup();
    m.setBookRead.mockResolvedValueOnce({});

    const { result } = renderHook(() => useToggleRead(), { wrapper });

    await result.current.mutateAsync({ id: 1, read: true });

    expect((qc.getQueryData(['books']) as any)[0].read).toBe(true);
    expect(m.setBookRead).toHaveBeenCalledWith(1, true);
    await waitFor(() => expect(m.showSnackbar).toHaveBeenCalledWith('Book updated', 'success'));
  });

  it('rolls back on error and shows error snackbar', async () => {
    const initial = [
      { id: 1, title: 'A', author: 'B', read: false },
      { id: 2, title: 'C', author: 'D', read: false },
    ];
    const { qc, wrapper } = setup(initial);
    m.setBookRead.mockRejectedValueOnce(new Error('Error'));

    const { result } = renderHook(() => useToggleRead(), { wrapper });
    await expect(result.current.mutateAsync({ id: 1, read: true })).rejects.toThrow();
    expect(qc.getQueryData(['books'])).toEqual(initial);
    await waitFor(() =>
      expect(m.showSnackbar).toHaveBeenCalledWith('Failed to update book', 'error'),
    );
  });
});
