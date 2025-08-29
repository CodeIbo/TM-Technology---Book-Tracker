import { TBookCreate, TBookRow } from '@packages/validations';
import db from '@/db/knex';

export class BooksModel {
  private static table = 'books';

  static async findAll(): Promise<TBookRow[] | []> {
    return db(this.table).select();
  }

  static async create({ title, author }: TBookCreate) {
    return db(this.table).insert({ title, author, read: false });
  }

  static async updateRead(id: number, read: boolean) {
    return db(this.table).where({ id }).update({ read });
  }
}
