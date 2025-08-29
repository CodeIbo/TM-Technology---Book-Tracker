import { Response } from 'express';
import { HttpError } from './http-error';
import HttpStatusCodes, { HttpMethod, HttpStatusCodeKey } from '@/types/http-status';

export class ResponseBuilder {
  private statusKey: HttpStatusCodeKey = 'OK';
  private message?: string;
  private data: unknown = null;

  constructor(private res: Response) {}

  private prepare(httpStatusKey: HttpStatusCodeKey, message?: string, data?: unknown) {
    this.statusKey = httpStatusKey;
    this.message = message ?? HttpStatusCodes[httpStatusKey].status;
    this.data = data ?? undefined;
    return this;
  }

  ok(data?: unknown, message?: string) {
    return this.prepare('OK', message, data);
  }

  created(data?: unknown, message?: string) {
    return this.prepare('CREATED', message, data);
  }

  fail(message?: string, data?: unknown) {
    return this.prepare('BAD_REQUEST', message, data);
  }

  notFound(message?: string) {
    return this.prepare('NOT_FOUND', message);
  }

  error(error: unknown, message = 'Internal Server Error') {
    console.error('❌ Internal error:', error);
    return this.prepare('INTERNAL_SERVER_ERROR', message, error);
  }

  failFromError(err: Error | unknown, place: string = 'unknown', reqType: HttpMethod = 'GET') {
    if (err instanceof HttpError) {
      return this.fail(err.message);
    }
    return this.fail(`Unexpected error during [${reqType}] ${place}`);
  }

  end(): void {
    if (this.res.headersSent || this.res.writableEnded) {
      //dev mode
      return;
    }
    const status = HttpStatusCodes[this.statusKey];
    this.res.status(status.code).json({
      success: this.statusKey.startsWith('OK') || this.statusKey.startsWith('CREATED'),
      timeStamp: new Date().toISOString(),
      statusCode: status.code,
      httpStatus: status.status,
      message: this.message,
      data: this.data,
    });
  }
}
