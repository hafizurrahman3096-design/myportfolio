import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    await prisma.project.delete({
      where: { id: Number(params.id) },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
