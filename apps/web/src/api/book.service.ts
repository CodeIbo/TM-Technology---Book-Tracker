import { apiClient } from './client';
import { API_ROUTES } from './routes';
import type { TBookRow, TBookCreate } from '@packages/validations';

export async function fetchBooks(): Promise<TBookRow[]> {
  const { data } = await apiClient.get(API_ROUTES.BOOKS.GET_ALL);
  return data.data;
}

export async function createBook(payload: TBookCreate): Promise<TBookRow> {
  const { data } = await apiClient.post<TBookRow>(API_ROUTES.BOOKS.CREATE, payload);
  return data;
}

export async function setBookRead(id: number, read: boolean): Promise<TBookRow> {
  const { data } = await apiClient.patch<TBookRow>(API_ROUTES.BOOKS.UPDATE_READ(id), { read });
  return data;
}
