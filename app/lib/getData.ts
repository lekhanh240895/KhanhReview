import Category from "../models/Category";
import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";
import { mongooseConnect } from "./mongoose";

interface Options {
  [key: string]: any;
}

export const getPosts = async (options?: Options) => {
  await mongooseConnect();

  if (options) {
    const posts = await Post.findOne(options).populate([
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

    return JSON.parse(JSON.stringify(posts));
  }

  const posts = await Post.find().populate([
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

  return JSON.parse(JSON.stringify(posts));
};

export const getPost = async (options?: Options) => {
  await mongooseConnect();

  const post = await Post.findOne(options).populate([
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

  return JSON.parse(JSON.stringify(post));
};

export const getPostsByPage = async (page: string) => {
  await mongooseConnect();
  const postsPerPage = 6;

  const posts = await Post.find({})
    .skip((parseInt(page, 10) - 1) * postsPerPage)
    .limit(postsPerPage)
    .sort({
      views: "desc",
    })
    .populate([
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

  return JSON.parse(JSON.stringify(posts));
};

export const getPopularPosts = async () => {
  await mongooseConnect();

  const posts: Post[] = await Post.find({})
    .sort({ views: "desc" })
    .populate([
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

  return JSON.parse(JSON.stringify(posts));
};

export const getCategories = async () => {
  await mongooseConnect();

  const categories = await Category.find({}).populate({
    path: "parent",
    model: "Category",
  });

  return JSON.parse(JSON.stringify(categories));
};
