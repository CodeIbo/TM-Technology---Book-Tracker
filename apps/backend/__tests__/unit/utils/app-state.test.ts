import { getEnvMode } from '@/utils/app-state';

describe('appState', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV;
  });

  it("returns 'development' if NODE_ENV is not set", () => {
    expect(getEnvMode()).toBe('development');
  });

  it("returns 'development' if NODE_ENV is incorrect", () => {
    process.env.NODE_ENV = 'FooBar';
    expect(getEnvMode()).toBe('development');
  });

  it('is case-insensitive', () => {
    process.env.NODE_ENV = 'Production';
    expect(getEnvMode()).toBe('production');

    process.env.NODE_ENV = 'TEST';
    expect(getEnvMode()).toBe('test');

    process.env.NODE_ENV = 'DeVeLoPmEnT';
    expect(getEnvMode()).toBe('development');
  });

  it('returns correct mode for valid values', () => {
    process.env.NODE_ENV = 'production';
    expect(getEnvMode()).toBe('production');

    process.env.NODE_ENV = 'test';
    expect(getEnvMode()).toBe('test');

    process.env.NODE_ENV = 'development';
    expect(getEnvMode()).toBe('development');
  });
});
