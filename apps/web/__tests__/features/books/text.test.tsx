import { describe, it, expect } from 'vitest';
import { clip } from '@/features/books/text';

describe('clip', () => {
  it('truncates and adds ellipsis', () => {
    expect(clip('abcdefghijklmnop', 5)).toBe('abcd…');
  });
  it('returns as-is when short', () => {
    expect(clip('abc', 5)).toBe('abc');
  });
  it('handles null/undefined', () => {
    expect(clip(undefined, 5)).toBe('');
  });
});
