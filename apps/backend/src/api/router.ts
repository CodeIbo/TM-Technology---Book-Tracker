import { Router } from 'express';

import booksRouter from './books/books.router';

const apiRouter = Router();

apiRouter.use('/books', booksRouter);

export default apiRouter;
