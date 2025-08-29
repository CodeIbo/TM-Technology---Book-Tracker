const mockKnex = jest.fn();
jest.mock('knex', () => ({ __esModule: true, default: mockKnex }));

jest.mock('@/db/knexconfig', () => ({
  __esModule: true,
  default: {
    development: { client: 'sqlite3', connection: { filename: 'dev.db' } },
    test: { client: 'sqlite3', connection: { filename: 'test.db' } },
  },
}));

async function loadKnexModule() {
  jest.resetModules();
  return require('@/db/knex');
}

describe('db/knex', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('uses development config by default', async () => {
    delete process.env.NODE_ENV;
    await loadKnexModule();
    expect(mockKnex).toHaveBeenCalledWith({
      client: 'sqlite3',
      connection: { filename: 'dev.db' },
    });
  });

  it('uses config based on NODE_ENV', async () => {
    process.env.NODE_ENV = 'test';
    await loadKnexModule();
    expect(mockKnex).toHaveBeenCalledWith({
      client: 'sqlite3',
      connection: { filename: 'test.db' },
    });
  });
});
