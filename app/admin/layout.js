import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-10">Admin</h1>
        <div className="flex flex-col gap-5 text-lg">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/projects/add">Add Project</Link>
          <Link href="/admin/messages">Messages</Link>
          <Link href="/admin/profile">Profile</Link>
          <Link href="/admin/logout">Logout</Link>
        </div>
      </aside>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
