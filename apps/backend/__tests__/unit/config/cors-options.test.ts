import corsOptions from '@/config/cors-options';

const OLD_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...OLD_ENV };
  delete process.env.NODE_ENV;
  delete process.env.ALLOWED_ORIGIN;
});

afterAll(() => {
  process.env = OLD_ENV;
});

function call(origin?: string | null) {
  return new Promise<{ err: unknown; allow?: boolean }>((resolve) => {
    (corsOptions.origin as any)(origin, (err: any, allow: any) => resolve({ err, allow }));
  });
}

test('CORS dev => allows any origin', async () => {
  process.env.NODE_ENV = 'development';
  const { err, allow } = await call('http://whatever.local');
  expect(err).toBeNull();
  expect(allow).toBe(true);
});

test('CORS prod => allows only from ALLOWED_ORIGIN (incl. subdomains)', async () => {
  process.env.NODE_ENV = 'production';
  process.env.ALLOWED_ORIGIN = 'example.com, foo.bar';

  let r = await call('https://api.example.com');
  expect(r.err).toBeNull();
  expect(r.allow).toBe(true);

  r = await call('http://foo.bar');
  expect(r.err).toBeNull();
  expect(r.allow).toBe(true);
});

test('CORS prod => rejects missing/unknown origin', async () => {
  process.env.NODE_ENV = 'production';
  process.env.ALLOWED_ORIGIN = 'example.com';

  let r = await call(undefined);
  expect(r.allow).toBeUndefined();
  expect(r.err).toBeInstanceOf(Error);

  r = await call('http://rickroll.com');
  expect(r.allow).toBeUndefined();
  expect(r.err).toBeInstanceOf(Error);
});

test('CORS options', () => {
  expect(corsOptions.credentials).toBe(true);
  expect(corsOptions.allowedHeaders).toEqual(['Content-Type']);
  expect(corsOptions.methods).toEqual(['GET', 'POST', 'PATCH']);
});
