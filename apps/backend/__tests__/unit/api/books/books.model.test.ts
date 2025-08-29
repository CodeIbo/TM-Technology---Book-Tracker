import db from '@/db/knex';
import { BooksModel } from '@/api/books/books.model';

jest.mock('@/db/knex', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockDb = db as unknown as jest.Mock;
const mockData = { title: '1984', author: 'Orwell', read: false };
const mockRows = [{ id: 1, title: 'Book 1', author: 'Author 1', read: false }];
const TABLE_NAME = 'books';

describe('Books Model (unit)', () => {
  beforeEach(() => {
    mockDb.mockReset();
  });

  it("findAll => calls db('books').select() and returns rows", async () => {
    const select = jest.fn().mockResolvedValue(mockRows);
    mockDb.mockReturnValueOnce({ select });

    const out = await BooksModel.findAll();

    expect(mockDb).toHaveBeenCalledWith(TABLE_NAME);
    expect(select).toHaveBeenCalled();
    expect(out).toEqual(mockRows);
  });

  it('create => inserts with read=false', async () => {
    const insert = jest.fn().mockResolvedValue([1]);
    mockDb.mockReturnValueOnce({ insert });

    const res = await BooksModel.create({ title: '1984', author: 'Orwell' });

    expect(mockDb).toHaveBeenCalledWith(TABLE_NAME);
    expect(insert).toHaveBeenCalledWith(mockData);
    expect(res).toEqual([1]);
  });

  it('updateRead => where({id}).update({read})', async () => {
    const update = jest.fn().mockResolvedValue(1);
    const where = jest.fn().mockReturnValue({ update });
    mockDb.mockReturnValueOnce({ where });

    const res = await BooksModel.updateRead(5, true);

    expect(mockDb).toHaveBeenCalledWith(TABLE_NAME);
    expect(where).toHaveBeenCalledWith({ id: 5 });
    expect(update).toHaveBeenCalledWith({ read: true });
    expect(res).toBe(1);
  });
});
