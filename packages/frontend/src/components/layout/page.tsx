// components/Layout.tsx
"use client";

import React from "react";
import Navbar from "../navbar/page";
import { ReactNode } from "react";
import "../../styles/globals.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-gray-800 text-white text-center p-4">
            &copy; {new Date().getFullYear()} Purchase History App
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
