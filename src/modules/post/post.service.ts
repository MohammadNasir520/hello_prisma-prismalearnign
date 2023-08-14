import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const insertIntoDB = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};
const getAllPost = async (): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

export const PostService = {
  insertIntoDB,
  getAllPost,
};
