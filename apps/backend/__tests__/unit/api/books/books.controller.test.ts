import { BooksModel } from '@/api/books/books.model';
import { ResponseBuilder } from '@/utils/response-builder';
import { createBook, getAllBooks, updateRead } from '@/api/books/books.controller';
import type { Request, Response } from 'express';

jest.mock('@/api/books/books.model', () => ({
  BooksModel: {
    findAll: jest.fn(),
    create: jest.fn(),
    updateRead: jest.fn(),
  },
}));

function createMockResponseBuilder() {
  return {
    ok: jest.fn().mockReturnThis(),
    created: jest.fn().mockReturnThis(),
    failFromError: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
  };
}

const rbInstance = createMockResponseBuilder();

jest.mock('@/utils/response-builder', () => {
  const ResponseBuilder = jest.fn().mockImplementation((_res: any) => rbInstance);
  return { ResponseBuilder };
});

const asMock = <T extends (...args: any[]) => any>(fn: T) => fn as unknown as jest.Mock;

function makeReqRes(overrides?: Partial<Request & Response>) {
  const req: Partial<Request> = { body: {}, params: {}, ...overrides };
  const res: Partial<Response> = { ...overrides };
  return { req, res };
}

describe('Books Controller (unit)', () => {
  beforeEach(() => {
    asMock(BooksModel.findAll).mockReset();
    asMock(BooksModel.create).mockReset();
    asMock(BooksModel.updateRead).mockReset();

    (ResponseBuilder as unknown as jest.Mock).mockClear();
    rbInstance.ok.mockClear();
    rbInstance.created.mockClear();
    rbInstance.failFromError.mockClear();
    rbInstance.end.mockClear();
  });

  describe('createBook', () => {
    it('calls model.create and responds with created()', async () => {
      const mockData = { title: '1984', author: 'Orwell' };
      asMock(BooksModel.create).mockResolvedValue([1]);
      const { req, res } = makeReqRes({ body: mockData });

      await createBook(req as Request, res as Response);

      expect(BooksModel.create).toHaveBeenCalledWith(mockData);
      expect(ResponseBuilder).toHaveBeenCalledWith(res);
      expect(rbInstance.created).toHaveBeenCalledWith();
      expect(rbInstance.end).toHaveBeenCalled();
    });

    it("on error uses failFromError('create contact','POST')", async () => {
      const boom = new Error('db down');
      asMock(BooksModel.create).mockRejectedValue(boom);
      const { req, res } = makeReqRes({ body: { title: 'X', author: 'Y' } });

      await createBook(req as Request, res as Response);

      expect(rbInstance.failFromError).toHaveBeenCalledWith(boom, 'create contact', 'POST');
      expect(rbInstance.end).toHaveBeenCalled();
    });
  });

  describe('getAllBooks', () => {
    it('returns ok(data) on success', async () => {
      const rows = [{ id: 1, title: 'A', author: 'B', read: false }];
      asMock(BooksModel.findAll).mockResolvedValue(rows);
      const { req, res } = makeReqRes();

      await getAllBooks(req as Request, res as Response);

      expect(BooksModel.findAll).toHaveBeenCalled();
      expect(rbInstance.ok).toHaveBeenCalledWith(rows);
      expect(rbInstance.end).toHaveBeenCalled();
    });

    it("on error uses failFromError('get all books','GET')", async () => {
      const err = new Error('nope');
      asMock(BooksModel.findAll).mockRejectedValue(err);
      const { req, res } = makeReqRes();

      await getAllBooks(req as Request, res as Response);

      expect(rbInstance.failFromError).toHaveBeenCalledWith(err, 'get all books', 'GET');
      expect(rbInstance.end).toHaveBeenCalled();
    });
  });

  describe('updateRead', () => {
    it('calls BooksModel.updateRead with numeric id and responds with ok()', async () => {
      asMock(BooksModel.updateRead).mockResolvedValue(1);
      const { req, res } = makeReqRes({ params: { id: '5' }, body: { read: true } });

      await updateRead(req as Request, res as Response);

      expect(BooksModel.updateRead).toHaveBeenCalledWith(5, true);
      expect(rbInstance.ok).toHaveBeenCalledWith();
      expect(rbInstance.end).toHaveBeenCalled();
    });

    it("on error uses failFromError('update read status','PATCH')", async () => {
      const err = new Error('boom');
      asMock(BooksModel.updateRead).mockRejectedValue(err);
      const { req, res } = makeReqRes({ params: { id: '1' }, body: { read: false } });

      await updateRead(req as Request, res as Response);

      expect(rbInstance.failFromError).toHaveBeenCalledWith(err, 'update read status', 'PATCH');
      expect(rbInstance.end).toHaveBeenCalled();
    });
  });
});
