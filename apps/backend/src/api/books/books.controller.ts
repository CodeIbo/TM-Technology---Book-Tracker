import { Response, Request } from 'express';

import { BooksModel } from './books.model';
import { ResponseBuilder } from '@/utils/response-builder';

export const createBook = async (req: Request, res: Response) => {
  const r = new ResponseBuilder(res);
  try {
    await BooksModel.create(req.body);
    r.created().end();
  } catch (err) {
    r.failFromError(err, 'create contact', 'POST').end();
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const r = new ResponseBuilder(res);
  try {
    const data = await BooksModel.findAll();
    r.ok(data).end();
  } catch (err) {
    r.failFromError(err, 'get all books', 'GET').end();
  }
};

export const updateRead = async (req: Request, res: Response) => {
  const r = new ResponseBuilder(res);
  try {
    await BooksModel.updateRead(Number(req.params.id), req.body.read);
    r.ok().end();
  } catch (err) {
    r.failFromError(err, 'update read status', 'PATCH').end();
  }
};
