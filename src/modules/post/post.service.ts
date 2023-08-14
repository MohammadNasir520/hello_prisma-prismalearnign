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

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
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
    const total = await tx.post.count();
    return {
      data: result,
      total: total,
    };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const PostService = {
  insertIntoDB,
  getAllPost,
  getSinglePost,
  updatePost,
};
