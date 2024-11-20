import type { Metadata } from "next";
import Layout from "@/components/layout/page";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Purchase Histories",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
