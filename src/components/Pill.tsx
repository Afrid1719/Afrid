import { type PropsWithChildren } from "react";

type PillProps = PropsWithChildren<{ classes?: string }>;

export default function Pill({ classes, children }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-app-primary/40 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-app-color-5/30 ${classes}`}
    >
      {children}
    </span>
  );
}
