/** Page buttons: first, last, and a window around the current page. A gap never hides just one page. */
export function pageWindow(page: number, pages: number, span = 1): (number | '…')[] {
  if (pages <= span * 2 + 5) return Array.from({ length: pages }, (_, i) => i + 1);
  let from = Math.max(2, Math.min(page - span, pages - span * 2 - 1));
  let to = Math.min(pages - 1, Math.max(page + span, span * 2 + 2));
  if (from === 3) from = 2;
  if (to === pages - 2) to = pages - 1;
  return [1, ...(from > 2 ? ['…' as const] : []), ...Array.from({ length: to - from + 1 }, (_, i) => from + i), ...(to < pages - 1 ? ['…' as const] : []), pages];
}

export const PAGE_SIZES = [10, 25, 50, 100] as const;
