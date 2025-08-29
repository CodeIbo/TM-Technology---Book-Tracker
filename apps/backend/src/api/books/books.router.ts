import { BookCreate, BookUpdateRead } from '@packages/validations';
import { Router } from 'express';

import validator from '@/middleware/validator';
import { idParamSchema } from '@/schemas/id';
import { createBook, getAllBooks, updateRead } from './books.controller';

const booksRouter = Router();

booksRouter.get('/', getAllBooks);
booksRouter.post(
  '/',
  validator([
    {
      target: 'body',
      schema: BookCreate,
    },
  ]),
  createBook,
);

booksRouter.patch(
  '/:id/read',
  validator([
    {
      target: 'params',
      schema: idParamSchema,
    },
    {
      target: 'body',
      schema: BookUpdateRead,
    },
  ]),
  updateRead,
);

export default booksRouter;
