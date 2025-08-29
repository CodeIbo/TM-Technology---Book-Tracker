import { z } from 'zod';
import validator from '@/middleware/validator';
import { ResponseBuilder } from '@/utils/response-builder';
import type { NextFunction } from 'express';

jest.mock('@/utils/response-builder', () => {
  return {
    ResponseBuilder: jest.fn(() => ({
      fail: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    })),
  };
});

const next = jest.fn() as unknown as NextFunction;

describe('Validator (unit)', () => {
  let req: any = {};
  let res: any = {};
  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = {};
  });

  it('valid body => calls next()', () => {
    const mockData = { title: '1984', author: 'Orwell' };
    const schema = z.object({ title: z.string(), author: z.string() });
    req = { body: mockData };
    res = {};

    validator([{ target: 'body', schema }])(req, res, next);

    expect(ResponseBuilder as unknown as jest.Mock).not.toHaveBeenCalled();
    expect(req.body).toEqual(mockData);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('invalid params+body => fail(...).end() + next()', () => {
    const paramsSchema = z.object({ id: z.number() });
    const bodySchema = z.object({ read: z.boolean() });

    req = { params: { id: 'abc' }, body: {} };
    res = {};

    validator([
      { target: 'params', schema: paramsSchema },
      { target: 'body', schema: bodySchema },
    ])(req, res, next);

    const RB = ResponseBuilder as jest.Mock;
    const inst = RB.mock.results[0]?.value;

    expect(ResponseBuilder).toHaveBeenCalledWith(res);
    expect(inst.fail).toHaveBeenCalledWith(
      'Validation failed',
      expect.objectContaining({ params: expect.any(Object), body: expect.any(Object) }),
    );
    expect(inst.end).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
