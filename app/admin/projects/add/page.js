"use client";

import { useState } from "react";

export default function AddProjectPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    techStack: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      alert("Project Added");
      setFormData({
        title: "",
        description: "",
        image: "",
        githubUrl: "",
        liveUrl: "",
        techStack: "",
      });
    } else {
      alert("Error");
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold mb-8">Add Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-3xl space-y-4">
        <input type="text" placeholder="Project Title" className="w-full border p-3 rounded" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <textarea placeholder="Description" className="w-full border p-3 rounded h-40" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <input type="text" placeholder="Project Image URL" className="w-full border p-3 rounded" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
        <input type="text" placeholder="GitHub URL" className="w-full border p-3 rounded" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} />
        <input type="text" placeholder="Live URL" className="w-full border p-3 rounded" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} />
        <input type="text" placeholder="Tech Stack" className="w-full border p-3 rounded" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} />
        <button disabled={loading} className="bg-black text-white px-6 py-3 rounded">
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
