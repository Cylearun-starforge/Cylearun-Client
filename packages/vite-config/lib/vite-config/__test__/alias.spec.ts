import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mapToViteDefine, toString } from '../alias';

describe('toString', () => {
  it('should convert number to string', () => {
    expect(toString(1)).toBe('1');
  });

  it('should convert string to string', () => {
    expect(toString('1')).toBe('"1"');
  });

  it('should convert boolean to string', () => {
    expect(toString(true)).toBe('true');
  });

  it('should not convert function to string', () => {
    expect(() => toString(() => {})).toThrow('Cannot stringify type function');
  });

  it('should not convert object to string', () => {
    expect(() => toString({})).toThrow('Cannot stringify type object');
  });

  it('should convert undefined to string', () => {
    expect(toString(undefined)).toBe('undefined');
  });

  it('should convert null to string', () => {
    expect(toString(null)).toBe('null');
  });

  it('should not convert symbol to string', () => {
    expect(() => toString(Symbol())).toThrow('Cannot stringify type symbol');
  });

  it('should not convert bigint to string', () => {
    expect(() => toString(BigInt(1))).toThrow('Cannot stringify type bigint');
  });
});

describe('mapToViteDefine', () => {
  it('should convert alias to vite define', () => {
    expect(
      mapToViteDefine({
        __DEV__: true,
        __PROD__: false,
        __MODE__: 'dev',
      })
    ).toEqual({
      'define.__DEV__': 'true',
      'define.__PROD__': 'false',
      'define.__MODE__': '"dev"',
    });
  });
});
