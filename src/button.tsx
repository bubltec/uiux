import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from './cx.js';

export type ButtonVariant = 'solid' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function buttonClass(variant: ButtonVariant = 'solid', size: ButtonSize = 'md', extra?: string): string {
  return cx('btn', size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', variant === 'ghost' && 'btn-ghost', variant === 'danger' && 'btn-danger', extra);
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
};

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ variant = 'solid', size = 'md', loading, className, children, ...rest }: AsButton | AsLink) {
  const cls = buttonClass(variant, size, className);
  if ('href' in rest && rest.href) {
    const { href, ...link } = rest;
    return (
      <a href={href} className={cls} aria-busy={loading || undefined} {...link}>
        {loading ? '…' : children}
      </a>
    );
  }
  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={button.type ?? 'button'} className={cls} disabled={button.disabled || loading} aria-busy={loading || undefined} {...button}>
      {loading ? '…' : children}
    </button>
  );
}
