export const API_ROUTES = {
  BOOKS: {
    GET_ALL: '/api/books',
    CREATE: '/api/books',
    UPDATE_READ: (id: number) => `/api/books/${id}/read`,
  },
} as const;
