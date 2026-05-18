export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold mb-8">Manage Projects</h1>
      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-gray-600">{project.techStack}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/projects/edit/${project.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
              <form action={`/api/projects/${project.id}`} method="POST">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
