import { describe, it, expect } from 'vitest';
import postcss, { type AcceptedPlugin } from 'postcss';
import { rcPathImpl } from '..';
import RcPolyfill from '../postcss-plugin';

describe('rc', () => {
  it('should convert to /@rc/* in dev mode', () => {
    expect(rcPathImpl(true, 'foo', 'bar/baz')).toEqual('/@rc/foo/bar/baz');
  });

  it('should convert to relative path starts with "../resources" and wrap folder in asar', () => {
    expect(rcPathImpl(false, 'foo', 'bar/baz')).toEqual('../resources/foo.asar/bar/baz');
  });
});

describe('rc postcss plugin', () => {
  it('should convert to /@rc/* in dev mode', () => {
    expect(define.__DEV__).toBeTruthy();
    const result = postcss([RcPolyfill as AcceptedPlugin]).process("@rc --path: 'foo','bar/baz'");
    expect(result.css).toEqual("--path: url('/@rc/foo/bar/baz')");
  });
});
