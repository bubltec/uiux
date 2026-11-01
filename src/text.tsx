import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './cx.js';

const TAG = { display: 'h1', title: 'h2', label: 'p', body: 'p', muted: 'p' } as const;
export type TextVariant = keyof typeof TAG;

export function Text({ variant = 'body', className, children, ...rest }: HTMLAttributes<HTMLElement> & { variant?: TextVariant; children?: ReactNode }) {
  const Tag = TAG[variant];
  return (
    <Tag className={cx(`text-${variant}`, variant !== 'body' && variant !== 'muted' && 'pixel', className)} {...rest}>
      {children}
    </Tag>
  );
}
