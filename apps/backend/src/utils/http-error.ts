import { HttpStatusDetail } from '@/types/http-status';

export class HttpError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message: string, status: HttpStatusDetail) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = status.code;
    this.statusText = status.status;
  }
}
