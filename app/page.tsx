import { Suspense } from "react";
import PostsSlider from "./components/PostsSlider";
import Pagination from "./components/Pagination";
import AsideContent from "./components/AsideContent";
import BlogList from "./components/BlogList";
import Post from "./models/Post";
import User from "./models/User";
import Category from "./models/Category";
import Comment from "./models/Comment";
import { mongooseConnect } from "./lib/mongoose";

export default async function Home() {
  await mongooseConnect();

  const posts: Post[] = await Post.find().populate([
    {
      path: "user",
      model: User,
    },
    {
      path: "category",
      model: Category,
      populate: {
        path: "parent",
        model: "Category",
      },
    },
    {
      path: "comments",
      model: Comment,
    },
  ]);

  return (
    <section>
      <PostsSlider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 px-4 pt-6 pb-12 md:px-6 md:pt-12 md:pb-24 max-w-7xl mx-auto">
        <div className="col-span-2">
          <article>
            <Suspense fallback={<div>Loading...</div>}>
              <BlogList posts={posts} />
            </Suspense>
          </article>

          <Pagination />
        </div>

        <AsideContent />
      </div>
    </section>
  );
}
