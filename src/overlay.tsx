import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from './cx.js';
import { Icon } from './icons.js';

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  wide,
  trigger,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
  trigger?: ReactNode;
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
      <dialog ref={ref} className={cx('dialog', wide && 'dialog-wide')} aria-labelledby={titleId} onClose={() => onOpenChange(false)}>
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
      </dialog>
    </>
  );
}

type TabsContext = { value: string; onValueChange: (value: string) => void };
const TabsState = createContext<TabsContext | null>(null);

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: ReactNode }) {
  const state = useMemo(() => ({ value, onValueChange }), [value, onValueChange]);
  return <TabsState.Provider value={state}>{children}</TabsState.Provider>;
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="tabs" role="tablist">
      {children}
    </div>
  );
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const state = useContext(TabsState);
  if (!state) throw new Error('Tab must be inside Tabs');
  const selected = state.value === value;
  return (
    <button type="button" className="tab" role="tab" aria-selected={selected} onClick={() => state.onValueChange(value)}>
      {children}
    </button>
  );
}

export function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const state = useContext(TabsState);
  if (!state || state.value !== value) return null;
  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
}

type ToastTone = 'info' | 'error';
type ToastItem = { id: number; tone: ToastTone; text: string };
const ToastPush = createContext<((text: string, tone?: ToastTone) => void) | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const next = useRef(0);
  const push = useCallback((text: string, tone: ToastTone = 'info') => {
    const id = next.current++;
    setToasts((t) => [...t, { id, tone, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === 'error' ? 6000 : 3000);
  }, []);
  return (
    <ToastPush.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={cx('toast', t.tone === 'error' && 'toast-error')}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastPush.Provider>
  );
}

export function useToast(): (text: string, tone?: ToastTone) => void {
  const push = useContext(ToastPush);
  if (!push) throw new Error('useToast must be inside ToastProvider');
  return push;
}
