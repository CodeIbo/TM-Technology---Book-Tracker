import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import BookTable from '@/components/BookTable/BookTable';

describe('BookTable', () => {
  const books = [
    { id: 1, title: 'Short', author: 'Name', read: false },
    { id: 2, title: 'Another', author: 'Author', read: true },
  ];

  it('renders headers and as many rows as books', () => {
    const onToggle = vi.fn();
    render(<BookTable books={books} onToggle={onToggle} />);

    expect(screen.getByRole('columnheader', { name: /id/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /read\?/i })).toBeInTheDocument();

    expect(screen.getAllByRole('switch')).toHaveLength(books.length);
  });

  it('clicking a row switch calls onToggle with id and new value', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<BookTable books={books} onToggle={onToggle} />);

    const switches = screen.getAllByRole('switch');
    await user.click(switches[0] as HTMLElement);

    expect(onToggle).toHaveBeenCalledWith(1, true);
  });
});
