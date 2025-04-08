import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "admin",
  description: "admin",
};

export default function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <>Admin</>;
}
