import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { type TBookCreate, BookCreate } from '@packages/validations';
import { useForm, Controller } from 'react-hook-form';

import { useSnackbar } from '@/hooks/useSnackbar';

export function BookForm({ onSubmit }: { onSubmit: (v: TBookCreate) => Promise<boolean> }) {
  const { showSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm<TBookCreate>({
    resolver: zodResolver(BookCreate),
    defaultValues: { title: '', author: '' },
  });

  const submit = async (data: TBookCreate) => {
    const ok = await onSubmit(data);

    if (ok) {
      showSnackbar('Book created', 'success');
      reset();
    } else {
      showSnackbar('Error creating book', 'error');
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="Title"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="Author"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="outlined" color="success" sx={{ minWidth: '15rem' }}>
          Save
        </Button>
      </Box>
    </form>
  );
}
