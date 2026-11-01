import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

describe('native select menus', () => {
  it('sets color-scheme on the control so WebKit does not open a blank menu', () => {
    expect(read('./themes/nes.css')).toContain(
      'select,\nselect optgroup,\nselect option {\n  color-scheme: dark;\n}',
    );
    expect(read('./themes/paw.css')).toContain(
      'select,\nselect optgroup,\nselect option {\n  color-scheme: light;\n}',
    );
  });

  it('paints options with the theme tokens', () => {
    expect(read('./theme.css')).toMatch(
      /select option,\s*select optgroup \{\s*background-color: var\(--bg\);\s*color: var\(--ink\);/,
    );
  });
});
