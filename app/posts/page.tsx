import React from "react";
import Post from "../components/Post";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  return res.json();
}

async function Page() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 grid-flow-dense">
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
      </ul>
    </main>
  );
}

export default Page;
