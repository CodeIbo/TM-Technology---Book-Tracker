import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchBooks, createBook, setBookRead } from '@/api/book.service';

const m = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
}));

vi.mock('@/api/client', () => ({
  apiClient: { get: m.get, post: m.post, patch: m.patch },
}));

vi.mock('@/api/routes', () => ({
  API_ROUTES: {
    BOOKS: {
      GET_ALL: '/books',
      CREATE: '/books',
      UPDATE_READ: (id: number) => `/books/${id}/read`,
    },
  },
}));

beforeEach(() => {
  m.get.mockReset();
  m.post.mockReset();
  m.patch.mockReset();
});

describe('Books Service', () => {
  it('fetchBooks => GET /books, returns data.data', async () => {
    const rows = [{ id: 1, title: '1984', author: 'Orwell', read: false }];
    m.get.mockResolvedValueOnce({ data: { data: rows } });

    const out = await fetchBooks();

    expect(m.get).toHaveBeenCalledWith('/books');
    expect(out).toEqual(rows);
  });

  it('createBook => POST /books with payload, returns data', async () => {
    const payload = { title: '1984', author: 'Orwell' };
    const created = { id: 10, ...payload, read: false };
    m.post.mockResolvedValueOnce({ data: created });

    const out = await createBook(payload as never);

    expect(m.post).toHaveBeenCalledWith('/books', payload);
    expect(out).toEqual(created);
  });

  it('setBookRead => PATCH /books/:id/read with {read}, returns data', async () => {
    const updated = { id: 5, title: 'X', author: 'Y', read: true };
    m.patch.mockResolvedValueOnce({ data: updated });

    const out = await setBookRead(5, true);

    expect(m.patch).toHaveBeenCalledWith('/books/5/read', { read: true });
    expect(out).toEqual(updated);
  });

  it('propagates errors from apiClient', async () => {
    m.get.mockRejectedValueOnce(new Error('Error'));
    await expect(fetchBooks()).rejects.toThrow('Error');
  });
});
