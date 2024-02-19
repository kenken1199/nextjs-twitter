"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

// // ...

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials from actions.ts";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }
export const follow = async (authid: string, followid: string) => {
  const authuser = await prisma.user.findUnique({
    where: {
      id: authid,
    },
  });

  let updatedFollowingIDs = [...(authuser?.followingIDs || [])];

  updatedFollowingIDs.push(followid);

  await prisma.user.update({
    where: {
      id: authid,
    },
    data: {
      followingIDs: updatedFollowingIDs,
    },
  });

  const followeduser = await prisma.user.findUnique({
    where: {
      id: followid,
    },
  });
  let updatedFollowedIDs = [...(followeduser?.followedByIDs || [])];

  updatedFollowedIDs.push(authid);
  await prisma.user.update({
    where: {
      id: followid,
    },
    data: {
      followedByIDs: updatedFollowedIDs,
    },
  });

  revalidatePath("/");
};

export const unfollow = async (authid: string, followid: string) => {
  const authuser = await prisma.user.findUnique({
    where: {
      id: authid,
    },
  });

  let updatedFollowingIDs = [...(authuser?.followingIDs || [])];

  let updatedFollowingIDsfiltered = updatedFollowingIDs.filter(
    (followingID) => followingID != followid
  );

  await prisma.user.update({
    where: {
      id: authid,
    },
    data: {
      followingIDs: updatedFollowingIDsfiltered,
    },
  });

  const followeduser = await prisma.user.findUnique({
    where: {
      id: followid,
    },
  });
  let updatedFollowedIDs = [...(followeduser?.followedByIDs || [])];

  let updatedFollowedIDsfilterted = updatedFollowedIDs.filter(
    (followedID) => followedID != authid
  );
  await prisma.user.update({
    where: {
      id: followid,
    },
    data: {
      followedByIDs: updatedFollowedIDsfilterted,
    },
  });

  revalidatePath("/");
};
