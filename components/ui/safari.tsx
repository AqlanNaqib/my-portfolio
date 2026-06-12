import type { ReactNode } from "react";

type SafariProps = {
  url: string;
  className?: string;
  children?: ReactNode;
};

export function Safari({ url, className, children }: SafariProps) {
  return (
    <div className={`safari-shell ${className ?? ""}`.trim()}>
      <div className="safari-toolbar">
        <div className="safari-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="safari-address">{url}</div>
      </div>
      <div className="safari-screen">{children}</div>
    </div>
  );
}
