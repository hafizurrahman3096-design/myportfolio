"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load projects"
          );
        }

        setProjects(data.projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Projects
      </h1>

      {loading && (
        <p className="text-gray-600">
          Loading projects...
        </p>
      )}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-600">
          No projects added yet.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {projects.map((project) => (

          <div
            key={project.id}
            className="border p-5 rounded-xl shadow"
          >

            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded"
              />
            )}

            <h2 className="text-2xl font-bold mt-4">
              {project.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {project.description}
            </p>

            <p className="mt-3 font-semibold">
              {project.techStack}
            </p>

            <div className="flex gap-4 mt-4">

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  GitHub
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border px-4 py-2 rounded"
                >
                  Live
                </a>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
