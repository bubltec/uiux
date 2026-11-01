import { describe, expect, it } from 'vitest';
import { pageWindow } from './page-window.js';

describe('pageWindow', () => {
  it('lists every page when there are few', () => {
    expect(pageWindow(1, 4)).toEqual([1, 2, 3, 4]);
  });

  it('keeps the ends and a window, and does not use a gap for a single page', () => {
    expect(pageWindow(1, 20)).toEqual([1, 2, 3, 4, '…', 20]);
    expect(pageWindow(5, 20)).toEqual([1, '…', 4, 5, 6, '…', 20]);
    expect(pageWindow(4, 20)).toEqual([1, 2, 3, 4, 5, '…', 20]);
  });
});
