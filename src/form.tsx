import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from './cx.js';

type FieldChildProps = { id: string; 'aria-describedby': string | undefined; 'aria-invalid': true | undefined };

export function Field({
  label,
  hint,
  error,
  reserveHint,
  children,
  className,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  reserveHint?: boolean;
  children: ReactNode | ((props: FieldChildProps) => ReactNode);
  className?: string;
}) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined;
  const props: FieldChildProps = { id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined };
  return (
    <div className={cx('field', className)}>
      {typeof children === 'function' ? (
        <>
          <label htmlFor={id} className="label">
            {label}
          </label>
          {children(props)}
        </>
      ) : (
        <label>
          <span className="label">{label}</span>
          {children}
        </label>
      )}
      {hint ? (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
      {!hint && !error && reserveHint ? (
        <p aria-hidden className="field-hint field-reserve">
          &nbsp;
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx('control', className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx('control', className)} {...rest} />;
}

export function Select({
  options,
  className,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { options: ReadonlyArray<{ value: string; label: string }> }) {
  return (
    <select className={cx('control', className)} {...rest}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function FileInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="file" className={cx('control', className)} {...rest} />;
}

export function ChipSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ReadonlyArray<{ value: string; label: string; title?: string }>;
  value: readonly string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            type="button"
            key={o.value}
            className="chip"
            title={o.title}
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value])}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  label,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <label className="switch">
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(e) => onCheckedChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (next: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="field">
      <legend className="label">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className="switch">
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (next: T) => void;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <label key={o.value}>
            <input className="sr-only" type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
