import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { BookRow } from '@/components/BookTable/BookRow';
import { clip } from '@/features/books/text';

function renderRow(book: any, onToggle = vi.fn()) {
  return {
    onToggle,
    user: userEvent.setup(),
    ...render(
      <table>
        <tbody>
          <BookRow book={book} onToggle={onToggle} />
        </tbody>
      </table>,
    ),
  };
}

describe('BookRow', () => {
  it('truncates long title/author and shows full text in tooltip on hover', async () => {
    const book = {
      id: 1,
      title: 'A very very very long book title',
      author: 'Some Very Very Long Author Name',
      read: false,
    };
    const { user } = renderRow(book);
    expect(screen.getByText(clip(book.title))).toBeInTheDocument();
    expect(screen.getByText(clip(book.author))).toBeInTheDocument();

    await user.hover(screen.getByText(clip(book.title)));
    expect(await screen.findByRole('tooltip')).toHaveTextContent(book.title);

    await user.hover(screen.getByText(clip(book.author)));
    expect(await screen.findByRole('tooltip')).toHaveTextContent(book.author);
  });

  it('clicking switch calls onToggle with id and new value', async () => {
    const book = { id: 2, title: 'Short', author: 'Name', read: false };
    const onToggle = vi.fn();
    const { user } = renderRow(book, onToggle);

    const checkbox = screen.getByRole('switch');
    await user.click(checkbox);

    expect(onToggle).toHaveBeenCalledWith(2, true);
  });
});
