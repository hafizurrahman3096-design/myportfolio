"use client";

import { useState } from "react";

export default function ContactPage() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      setStatus("Message sent successfully.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        Contact Me
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >

        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full border p-3 rounded"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Your Message"
          required
          className="w-full border p-3 rounded h-40"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
        />

        {status && (
          <p className="text-gray-700">
            {status}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-3 rounded disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

      </form>

    </div>
  );
}
