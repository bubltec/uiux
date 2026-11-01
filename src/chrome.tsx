import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './icons.js';

export function Stack({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('stack', className)} {...rest}>
      {children}
    </div>
  );
}

export function Cluster({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('cluster', className)} {...rest}>
      {children}
    </div>
  );
}

export function AppFrame({ banner, children, className }: { banner?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <>
      {banner}
      <div className={cx('app-frame', className)}>{children}</div>
    </>
  );
}

export function AppHeader({
  brand,
  nav,
  trailing,
  sticky,
}: {
  brand: ReactNode;
  nav?: ReactNode;
  trailing?: ReactNode;
  sticky?: boolean;
}) {
  return (
    <header className={cx('app-header', sticky && 'app-header-sticky')}>
      <div className="app-header-brand">{brand}</div>
      <div className="cluster">
        {nav ? (
          <nav className="app-nav" aria-label="Main">
            {nav}
          </nav>
        ) : null}
        {trailing}
      </div>
    </header>
  );
}

export function AppFooter({ children }: { children: ReactNode }) {
  return <footer className="app-footer">{children}</footer>;
}

export function AppSection({ children, narrow, className }: { children: ReactNode; narrow?: boolean; className?: string }) {
  return <section className={cx(narrow && 'app-section-narrow', className)}>{children}</section>;
}

export function AppMain({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cx('app-main', className)}>{children}</main>;
}

/** Side sheet. `open` is controlled. The trigger is optional. */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    }
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <>
      {trigger ? (
        <span className="dialog-trigger" onClick={() => onOpenChange(true)}>
          {trigger}
        </span>
      ) : null}
      <dialog
        ref={ref}
        className="drawer"
        aria-labelledby={titleId}
        onClose={() => onOpenChange(false)}
        onClick={(e) => {
          if (e.target === ref.current) onOpenChange(false);
        }}
      >
        <div className="drawer-body">
          <div className="dialog-head">
            <div>
              <h2 id={titleId} className="dialog-title">
                {title}
              </h2>
              {description ? <p className="dialog-desc">{description}</p> : null}
            </div>
            <button type="button" className="btn btn-ghost btn-sm" aria-label="Close" onClick={() => onOpenChange(false)}>
              <Icon name="close" />
            </button>
          </div>
          <div className="dialog-body">{children}</div>
        </div>
      </dialog>
    </>
  );
}
