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
const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(page) * parseInt(limit) - parseInt(limit);

  const take = parseInt(limit);

  const result = await prisma.post.findMany({
    skip: skip,
    take: take,
    include: {
      author: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  const total = await prisma.post.count();
  return {
    data: result,
    total: total,
  };
};
const getSinglePost = async (id: number): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    where: {
      id: id,
    },
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
  getSinglePost,
};
