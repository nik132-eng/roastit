import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import cloudinary, { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;

    if (!title || !image) {
      return NextResponse.json(
        { message: "Title and image are required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult = (await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            tags: ["roastit-uploads"],
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (!result) {
              reject(new Error("Upload failed, no result returned"));
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    })) as UploadApiResponse;

    const { secure_url } = uploadResult;

    if (!secure_url) {
      throw new Error("Image upload failed, no secure_url returned.");
    }

    const post = await prisma.post.create({
      data: {
        title,
        imageUrl: secure_url,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Failed to create post", error: errorMessage },
      { status: 500 }
    );
  }
}

