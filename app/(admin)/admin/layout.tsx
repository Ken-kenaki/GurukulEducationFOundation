// src/app/admin/layout.tsx
import "@/app/globals.css";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/server/appwrite";
import AdminNavbar from "@/Components/admin/AdminNavbar";
import AdminFooter from "@/Components/admin/AdminFooter";

interface LayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const user = await getLoggedInUser();
  if (!user) redirect("/signup");

  return (
    <html className="min-h-screen bg-gray-50 flex">
      <body>
        <AdminNavbar
          user={{
            email: user.email,
            name: user.name,
            $id: user.$id,
          }}
        />

        <div className="flex-1 lg:ml-64 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
          <AdminFooter />
        </div>
      </body>
    </html>
  );
}
