import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Link
          href="/admin/projects/add"
          className="bg-black text-white p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold">
            Projects
          </h2>
          <p className="mt-2 text-gray-300">
            Add a new project
          </p>
        </Link>

        <Link
          href="/admin/messages"
          className="bg-black text-white p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold">
            Messages
          </h2>
          <p className="mt-2 text-gray-300">
            View contact messages
          </p>
        </Link>

        <div className="bg-black text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            Profile
          </h2>
        </div>

      </div>

    </div>
  );
}
