import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './cx.js';

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('panel', 'card', className)} {...rest}>
      {children}
    </div>
  );
}

export type NoticeTone = 'info' | 'warn' | 'error' | 'preview';

export function Notice({ tone = 'info', children, className }: { tone?: NoticeTone; children: ReactNode; className?: string }) {
  return (
    <div role={tone === 'error' ? 'alert' : undefined} className={cx('notice', tone !== 'info' && `notice-${tone}`, className)}>
      {children}
    </div>
  );
}

export type BadgeTone = 'neutral' | 'ok' | 'warn' | 'accent' | 'danger';

export function Badge({ tone = 'neutral', children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return <span className={cx('badge', tone !== 'neutral' && `badge-${tone}`, className)}>{children}</span>;
}
