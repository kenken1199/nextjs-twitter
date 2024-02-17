import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const password = "12345";

async function main() {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: "test",
      passwd: hashedPassword,
      email: "test@gmail.com",
    },
  });

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from "@prisma/client";
// import { User } from "@prisma/client";

// const prisma = new PrismaClient();

// const email = "test@gmail.com";

// async function getUser(email: string): Promise<User | null> {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });
//     console.log(user);
//     return user;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// getUser(email);
