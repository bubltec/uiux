import { PAGE_SIZES, pageWindow } from './page-window.js';
import { cx } from './cx.js';

export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <p className="pixel text-label" role="status">
      {label}…
    </p>
  );
}

export function ErrorBox({ title = 'Error', children }: { title?: string; children: string }) {
  return (
    <div className="notice notice-error" role="alert">
      <p className="text-label">{title}</p>
      <p className="text-body">{children}</p>
    </div>
  );
}

export function Pagination({
  page,
  pages,
  total,
  size,
  noun,
  onPage,
  onSize,
  sizes = PAGE_SIZES,
}: {
  page: number;
  pages: number;
  total: number;
  size: number;
  noun: string;
  onPage: (page: number) => void;
  onSize?: (size: number) => void;
  sizes?: readonly number[];
}) {
  if (total === 0) return null;
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, total);
  return (
    <nav aria-label={`${noun} pages`} className="pager">
      <p className="pager-count" aria-live="polite">
        {from}–{to} of {total} {noun}
      </p>
      <div className="cluster">
        {pages > 1 && (
          <>
            <button type="button" className="btn btn-ghost" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
              ‹ Prev
            </button>
            {pageWindow(page, pages).map((p, i) =>
              p === '…' ? (
                <span key={`gap-${i}`} aria-hidden>
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={cx('btn', p !== page && 'btn-ghost')}
                  aria-current={p === page ? 'page' : undefined}
                  aria-label={`Page ${p}`}
                  onClick={() => onPage(p)}
                >
                  {p}
                </button>
              ),
            )}
            <button type="button" className="btn btn-ghost" disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">
              Next ›
            </button>
          </>
        )}
        {onSize && (
          <select className="control control-auto" value={size} aria-label="Per page" onChange={(e) => onSize(Number(e.target.value))}>
            {sizes.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        )}
      </div>
    </nav>
  );
}
