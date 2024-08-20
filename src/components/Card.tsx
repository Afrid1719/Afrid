import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  mergeClasses?: boolean;
  className?: string;
}>;

export default function Card({
  children,
  className = "",
  mergeClasses = true
}: CardProps) {
  const defaultClasses =
    "flex flex-col md:border-2 md:border-app-primary md:shadow-md md:shadow-app-primary md:rounded-xl";
  if (mergeClasses) {
    className = `${defaultClasses} ${className}`;
  }

  return <section className={className}>{children}</section>;
}
