import React from "react";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Admin Panel | Ram Hanuman Chalisa",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
