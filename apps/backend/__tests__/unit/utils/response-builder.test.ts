import { Response } from 'express';
import HttpStatusCodes from '@/types/http-status';
import { HttpError } from '@/utils/http-error';
import { ResponseBuilder } from '@/utils/response-builder';

function makeRes(overrides?: Partial<Response>) {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }) as any);
  return {
    status,
    json,
    headersSent: false,
    writableEnded: false,
    ...overrides,
  } as unknown as Response & { status: jest.Mock; json: jest.Mock };
}

describe('ResponseBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with success=true and payload on ok()', () => {
    const res = makeRes();

    new ResponseBuilder(res).ok({ id: 1 }, 'Listed').end();

    expect(res.status).toHaveBeenCalledWith(HttpStatusCodes.OK.code);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        statusCode: 200,
        httpStatus: HttpStatusCodes.OK.status,
        message: 'Listed',
        data: { id: 1 },
        timeStamp: expect.any(String),
      }),
    );
  });

  it('returns 201 on created()', () => {
    const res = makeRes();

    new ResponseBuilder(res).created({ id: 7 }).end();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        statusCode: 201,
        httpStatus: HttpStatusCodes.CREATED.status,
        message: HttpStatusCodes.CREATED.status,
        data: { id: 7 },
      }),
    );
  });

  it('returns 400 on fail()', () => {
    const res = makeRes();

    new ResponseBuilder(res).fail('Bad input', { field: 'x' }).end();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        httpStatus: HttpStatusCodes.BAD_REQUEST.status,
        message: 'Bad input',
        data: { field: 'x' },
      }),
    );
  });

  it('returns 404 on notFound()', () => {
    const res = makeRes();

    new ResponseBuilder(res).notFound('Nope').end();

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        httpStatus: HttpStatusCodes.NOT_FOUND.status,
        message: 'Nope',
      }),
    );
  });

  it('returns 500 on error() and logs the error', () => {
    const res = makeRes();
    const err = new Error('test-error');
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    new ResponseBuilder(res).error(err, 'Something went wrong').end();

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        httpStatus: HttpStatusCodes.INTERNAL_SERVER_ERROR.status,
        message: 'Something went wrong',
        data: err,
      }),
    );

    spy.mockRestore();
  });

  it('uses HttpError message in failFromError()', () => {
    const res = makeRes();
    const httpErr = new HttpError('Invalid token', HttpStatusCodes.BAD_REQUEST);

    new ResponseBuilder(res).failFromError(httpErr, '/books/{bookId}', 'POST').end();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Invalid token',
      }),
    );
  });

  it('falls back to a generic message in failFromError() for unknown errors', () => {
    const res = makeRes();

    new ResponseBuilder(res).failFromError({} as any, '/books', 'PATCH').end();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Unexpected error during [PATCH] /books',
      }),
    );
  });

  it('does nothing if headers were already sent', () => {
    const res = makeRes({ headersSent: true });

    new ResponseBuilder(res).ok().end();

    expect(res.status).not.toHaveBeenCalled();
  });

  it('does nothing if the response is already ended', () => {
    const res = makeRes({ writableEnded: true });

    new ResponseBuilder(res).ok().end();

    expect(res.status).not.toHaveBeenCalled();
  });

  it('falls back to status text when message is not provided', () => {
    const res = makeRes();

    new ResponseBuilder(res).ok().end();

    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({ message: HttpStatusCodes.OK.status }),
    );
  });
});
