import { cx } from './cx.js';

export type IconName = 'play' | 'external' | 'close' | 'menu';

/** Crisp-edge marks. Pass `label` when the icon is the only content of a control. */
export function Icon({ name, label, className }: { name: IconName; label?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cx('icon', className)}
      shapeRendering="crispEdges"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {name === 'play' && <polygon points="4,2 14,8 4,14" fill="currentColor" />}
      {name === 'external' && (
        <>
          <rect x="2" y="4" width="8" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="8,2 14,2 14,8 12,8 12,5 9,8 7,6 10,3 8,3" fill="currentColor" />
        </>
      )}
      {name === 'close' && (
        <>
          <rect x="3" y="2" width="2" height="2" fill="currentColor" />
          <rect x="5" y="4" width="2" height="2" fill="currentColor" />
          <rect x="7" y="6" width="2" height="2" fill="currentColor" />
          <rect x="9" y="4" width="2" height="2" fill="currentColor" />
          <rect x="11" y="2" width="2" height="2" fill="currentColor" />
          <rect x="3" y="12" width="2" height="2" fill="currentColor" />
          <rect x="5" y="10" width="2" height="2" fill="currentColor" />
          <rect x="9" y="10" width="2" height="2" fill="currentColor" />
          <rect x="11" y="12" width="2" height="2" fill="currentColor" />
        </>
      )}
      {name === 'menu' && (
        <>
          <rect x="2" y="3" width="12" height="2" fill="currentColor" />
          <rect x="2" y="7" width="12" height="2" fill="currentColor" />
          <rect x="2" y="11" width="12" height="2" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
