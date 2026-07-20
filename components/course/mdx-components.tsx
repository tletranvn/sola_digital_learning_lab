import type { ReactNode } from "react";

export function Callout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <aside className="learning-callout" aria-label={title}>
      <h3>{title}</h3>
      <div>{children}</div>
    </aside>
  );
}

export function KeyIdea({ children }: { children: ReactNode }) {
  return <div className="key-idea">{children}</div>;
}
