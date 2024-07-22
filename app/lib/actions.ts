"use server";
import { PrismaClient, User, Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SessionData, defaultSession, sessionOptions } from "./lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const siginUp = async (formData: FormData) => {
  const formUsername = formData.get("username") as string;
  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  const hashedPassword = await bcrypt.hash(formPassword, 10);

  await prisma.user.create({
    data: {
      name: formUsername,
      password: hashedPassword,
      email: formEmail,
    },
  });

  redirect("/login");
};

export const addPost = async (formData: FormData) => {
  const formPost = formData.get("text") as string;
  const session = await getSession();
  await prisma.post.create({
    data: {
      title: formPost,
      authorId: session.userId as string,
    },
  });

  redirect("/home");
};

export const login = async (formData: FormData) => {
  const session = await getSession();
  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  const data = { email: formEmail, password: formPassword };

  async function getUser(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw new Error("Failed to fetch user.");
    }
  }

  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(5) })
    .safeParse(data);

  async function loginCheck() {
    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      const user = await getUser(email);
      if (!user) return null;
      if (!user.password) return null;
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) return user;
    }
    console.log("Invalid credentials from auth.ts");
    return null;
  }

  const user = await loginCheck();
  // console.log(user);
  if (user?.id && user?.name) {
    session.userId = user?.id;
    session.username = user?.name;
    session.isLoggedIn = true;
  }
  await session.save();
  redirect("/home");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

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

  revalidatePath("/home");
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

  revalidatePath("/home");
};
