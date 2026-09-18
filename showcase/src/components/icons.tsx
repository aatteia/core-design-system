import type { JSX } from "react";

export function IconBars(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="currentColor" d="M2 4h14v1.5H2V4zm0 4.25h14v1.5H2v-1.5zM2 12.5h14V14H2v-1.5z" />
    </svg>
  );
}

export function IconMark(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}

export function IconPlus(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M7.25 2h1.5v5.25H14v1.5H8.75V14h-1.5V8.75H2v-1.5h5.25V2z" />
    </svg>
  );
}

export function IconExternal(): JSX.Element {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ marginLeft: 4 }}>
      <path
        fill="currentColor"
        d="M4 2h6v6H8.5V4.56L3.03 10.03l-1.06-1.06L7.44 3.5H4V2z"
      />
    </svg>
  );
}

export function IconError(): JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 1a6 6 0 100 12A6 6 0 007 1zm-.7 3h1.4v4.2H6.3V4zm.7 6.3a.85.85 0 110-1.7.85.85 0 010 1.7z"
      />
    </svg>
  );
}
