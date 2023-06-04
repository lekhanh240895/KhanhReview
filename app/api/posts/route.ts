import { mongooseConnect } from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await mongooseConnect();

  const posts = await Post.find({}).sort({
    createdAt: "desc",
  });

  return NextResponse.json(posts);
}
