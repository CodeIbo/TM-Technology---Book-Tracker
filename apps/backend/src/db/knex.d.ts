import { TBookCreate, TBookRow, TBookUpdateRead } from '@packages/validations';
import type { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    books: Knex.CompositeTableType<TBookRow, TBookCreate, TBookUpdateRead>;
  }
}
