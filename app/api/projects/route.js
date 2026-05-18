import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects =
      await prisma.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {

    const body = await req.json();
    const {
      title,
      description,
      image,
      githubUrl,
      liveUrl,
      techStack,
    } = body;

    if (!title || !description || !techStack) {
      return Response.json(
        {
          success: false,
          message:
            "Title, description, and tech stack are required",
        },
        { status: 400 }
      );
    }

    const project =
      await prisma.project.create({
        data: {
          title,
          description,
          image: image || null,
          githubUrl:
            githubUrl || null,
          liveUrl: liveUrl || null,
          techStack,
        },
      });

    return Response.json({
      success: true,
      project,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      message: "Server Error",
    }, { status: 500 });
  }
}
