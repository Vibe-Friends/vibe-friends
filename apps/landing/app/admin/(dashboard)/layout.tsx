import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <AdminNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
