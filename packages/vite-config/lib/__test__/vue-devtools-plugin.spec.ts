import { HtmlTagDescriptor } from 'vite';
import { IndexHtmlTransformHook } from 'vite';
import { describe, it, expect } from 'vitest';
import { formatContentSecurityPolicyContent, default as pluginFactory } from '../vue-devtools-plugin.js';
describe('Format ContentSecurityPolicy Content', () => {
  it('should concat sources', () => {
    const sources = ["'self'", 'unsafe-inline'];
    const result = "default-src 'self' unsafe-inline";
    expect(formatContentSecurityPolicyContent({ 'default-src': sources })).toBe(result);
  });

  it('should concat multiple sources with semi', () => {
    const sources = ["'self'", 'unsafe-inline'];
    const result = "default-src 'self' unsafe-inline; script-src 'self' unsafe-inline";
    expect(formatContentSecurityPolicyContent({ 'default-src': sources, 'script-src': sources })).toBe(result);
  });
});

describe('Vue Devtools Plugin', () => {
  it('should return plugin', () => {
    const plugin = pluginFactory({ port: 8080, mode: 'dev' });
    expect(plugin).toBeInstanceOf(Object);
    expect(plugin.transformIndexHtml).toBeInstanceOf(Function);
  });

  it('should return 1 tag with prod mode', () => {
    const plugin = pluginFactory({ port: 8080, mode: 'prod' });
    const converter = plugin.transformIndexHtml as IndexHtmlTransformHook;
    const tags = converter('', {} as any) as HtmlTagDescriptor[];
    expect(tags.length).toBe(1);
    expect(tags[0].tag).toBe('meta');
    expect(tags[0].attrs!['http-equiv']).toBe('Content-Security-Policy');
  });

  it('should return 2 tag with dev mode', () => {
    const plugin = pluginFactory({ port: 8080, mode: 'dev' });
    const converter = plugin.transformIndexHtml as IndexHtmlTransformHook;
    const tags = converter('', {} as any) as HtmlTagDescriptor[];
    expect(tags.length).toBe(2);
    expect(tags[1].tag).toBe('script');
    expect(tags[1].attrs!['src']).toBe('http://localhost:8080');
  });
});
