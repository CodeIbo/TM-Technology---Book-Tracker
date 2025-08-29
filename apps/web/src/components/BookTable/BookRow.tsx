import { Switch, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { clip } from '@/features/books/text';
import type { TBookRow } from '@packages/validations';

export function BookRow({
  book,
  onToggle,
}: {
  book: TBookRow;
  onToggle: (id: number, read: boolean) => void;
}) {
  return (
    <TableRow key={book.id}>
      <TableCell>{book.id}</TableCell>

      <TableCell>
        <Tooltip
          title={book.title}
          disableInteractive
          disableHoverListener={book.author.length < 20}
        >
          <Typography variant="body1" component="span">
            {clip(book.title)}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell>
        <Tooltip
          title={book.author}
          disableInteractive
          disableHoverListener={book.author.length < 20}
        >
          <Typography variant="body1" component="span">
            {clip(book.author)}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell>
        <Switch
          color="success"
          checked={book.read}
          onChange={(_, checked) => onToggle(book.id, checked)}
          title="Switch read status"
        />
      </TableCell>
    </TableRow>
  );
}
