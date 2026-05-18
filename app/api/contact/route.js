import { prisma } from "@/lib/prisma";

export async function POST(req) {

  try {

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      message: "Server Error",
    }, { status: 500 });
  }
}
