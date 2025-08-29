import { Typography } from '@mui/material';
import { type TBookCreate } from '@packages/validations';
import { useState } from 'react';

import { BookForm } from '@/components/forms/BookForm';
import { useCreateBook } from '@/features/books/hooks';

export function NewBookPage() {
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync } = useCreateBook();

  async function handleCreate(values: TBookCreate): Promise<boolean> {
    setError(null);
    try {
      await mutateAsync(values);
      return true;
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Create failed');
      }
      return false;
    }
  }

  return (
    <>
      <BookForm onSubmit={handleCreate} />
      {error && (
        <Typography color="error" component="p">
          {error}
        </Typography>
      )}
    </>
  );
}
