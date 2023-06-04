import React from "react";
import Post from "../models/Post";
import PostItem from "../components/PostItem";
import { mongooseConnect } from "../lib/mongoose";

export const revalidate = 3600; // revalidate every hour

async function getPosts() {
  await mongooseConnect();

  const posts = await Post.find();
  return posts;
}

async function Page() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 grid-flow-dense">
        {posts.length > 0 &&
          posts.map((post) => <PostItem post={post} key={post._id} />)}
      </ul>
    </main>
  );
}

export default Page;
