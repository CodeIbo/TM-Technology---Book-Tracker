import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { BookForm } from '@/components/forms/BookForm';

const m = vi.hoisted(() => ({ showSnackbar: vi.fn() }));
vi.mock('@/hooks/useSnackbar', () => ({ useSnackbar: () => ({ showSnackbar: m.showSnackbar }) }));

describe('BookForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not submit when fields are empty (shows validation)', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();
    render(<BookForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).not.toHaveBeenCalled();

    const title = screen.getByRole('textbox', { name: /title/i });
    const author = screen.getByRole('textbox', { name: /author/i });
    expect(title).toHaveAttribute('aria-invalid', 'true');
    expect(author).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits valid data => shows success, resets form', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();
    render(<BookForm onSubmit={onSubmit} />);

    const title = screen.getByRole('textbox', { name: /title/i });
    const author = screen.getByRole('textbox', { name: /author/i });

    await user.type(title, 'Dune');
    await user.type(author, 'Herbert');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Dune', author: 'Herbert' });

    expect(m.showSnackbar).toHaveBeenCalledWith('Book created', 'success');

    expect(title).toHaveValue('');
    expect(author).toHaveValue('');
  });

  it('onSubmit return false => show error and does not reset', async () => {
    const onSubmit = vi.fn().mockResolvedValue(false);
    const user = userEvent.setup();
    render(<BookForm onSubmit={onSubmit} />);

    const title = screen.getByRole('textbox', { name: /title/i });
    const author = screen.getByRole('textbox', { name: /author/i });

    await user.type(title, '1984');
    await user.type(author, 'Orwell');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({ title: '1984', author: 'Orwell' });
    expect(m.showSnackbar).toHaveBeenCalledWith('Error creating book', 'error');

    expect(title).toHaveValue('');
    expect(author).toHaveValue('');
  });
});
