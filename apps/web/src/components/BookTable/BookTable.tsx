import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from '@mui/material';

import { BookRow } from './BookRow';
import type { TBookRow } from '@packages/validations';

export default function BookTable({
  books,
  onToggle,
}: {
  books: TBookRow[];
  onToggle: (id: number, read: boolean) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Read?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <BookRow key={book.id} book={book} onToggle={onToggle} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
