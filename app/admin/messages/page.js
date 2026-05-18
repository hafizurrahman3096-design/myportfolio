import { prisma } from "@/lib/prisma";

export default async function MessagesPage() {

  const messages =
    await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        Messages
      </h1>

      {messages.length === 0 && (
        <p className="text-gray-600">
          No messages yet.
        </p>
      )}

      <div className="space-y-5">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className="border p-5 rounded-xl"
          >

            <h2 className="text-2xl font-bold">
              {msg.name}
            </h2>

            <p className="text-gray-600">
              {msg.email}
            </p>

            <p className="mt-3">
              {msg.message}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
