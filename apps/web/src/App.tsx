import { Container, Typography, CircularProgress } from '@mui/material';
import BookTable from '@/components/BookTable/BookTable';
import { useBooks, useToggleRead } from '@/features/books/hooks';
import { NewBookPage } from '@/pages/NewBook';

function App() {
  const { data = [], isLoading } = useBooks();
  const toggleRead = useToggleRead();

  return (
    <Container component="main" sx={{ py: 5 }}>
      <Typography variant="h3" component="h1" sx={{ pt: 5, pb: 2 }} textAlign="center">
        Add Book
      </Typography>
      <NewBookPage />
      <Typography variant="h3" textAlign="center" component="h2" sx={{ pt: 5, pb: 2 }}>
        Books
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <BookTable books={data} onToggle={(id, read) => toggleRead.mutate({ id, read })} />
      )}
    </Container>
  );
}

export default App;
