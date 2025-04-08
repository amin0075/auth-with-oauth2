import type React from "react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: 'PAGE_INFO',
//   description: 'PAGE_INFO',
// };

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <>{children}</>;
}
