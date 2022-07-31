import { describe, it, expect } from 'vitest';

const add = (a: number, b: number) => a + b;

describe('add', () => {
  it('2 + 2 = 4', () => {
    expect(add(2, 2)).toEqual(4);
  });
});
