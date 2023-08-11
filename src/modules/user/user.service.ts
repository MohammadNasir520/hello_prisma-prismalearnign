import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};
const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });
  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profile.create({
    data: data,
  });
  return result;
};
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    // select: {
    //   email: true,
    // },

    //its like populate from mongoose
    include: {
      profile: true,
    },
  });
  return result;
};
const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    //its like populate from mongoose
    include: {
      profile: true,
    },
  });
  return result;
};

export const userService = {
  insertIntoDB,
  insertOrUpdateProfile,
  getAllUsers,
  getSingleUser,
};
