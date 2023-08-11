import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const getAllUsers = await prisma.user.findMany();
  console.log(getAllUsers);

  //  crete data
  // const postUser = await prisma.user.create({
  //   data: {
  //     email: "nasirAhsan@gmail.com",
  //     name: "nasir Ahsan",
  //   },
  // });

  // console.log(postUser);
}

main();
