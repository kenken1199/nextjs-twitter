import { PrismaClient } from "@prisma/client";
import FollowButton from "../ui/follow-button";
import UnfollowButton from "../ui/unfollow-button";
import LogoutForm from "../ui/logoutForm";
import { getSession } from "../lib/actions";
import { redirect } from "next/navigation";
import AddPost from "../ui/addPost";

const prisma = new PrismaClient();

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  const authId = session?.userId as string;

  const authUser = await prisma.user.findUnique({
    where: {
      id: authId,
    },
  });

  const allPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const allPostsUsersIds = [...(authUser?.followingIDs || [])];
  allPostsUsersIds.push(authId);

  const followingUsersAllPosts = await prisma.post.findMany({
    where: {
      OR: allPostsUsersIds?.map((id) => ({
        authorId: id,
      })),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const allUsers = await prisma.user.findMany();

  const ownPosts = await prisma.post.findMany({
    where: {
      authorId: authId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="m-8">
      <div>{session.username}のページ</div>
      <AddPost />
      <ul className="mt-8">
        <h1 className="text-xl font-bold">ユーザ一覧</h1>
        {allUsers.map((user) => (
          <li className="flex mb-3" key={user.id}>
            <span className="w-24">
              {user.id.includes(authId) ? <div></div> : user.name}
            </span>
            <div className="ml-16">
              {user.id.includes(authId) ? (
                <div></div>
              ) : user.followedByIDs.includes(authId) ? (
                <UnfollowButton authId={authId} id={user.id} />
              ) : (
                <FollowButton authId={authId} id={user.id} />
              )}
            </div>
          </li>
        ))}
      </ul>

      <h1 className="mt-8 text-xl font-bold">自分のPost一覧</h1>
      <ul className="mb-8">
        {ownPosts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
          </li>
        ))}
      </ul>
      {/* <h1 className="text-xl font-bold">followinpost一覧</h1>
      <ul className="mt-8">
        {followingUsersPosts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
          </li>
        ))}
      </ul> */}

      <h1 className="text-xl font-bold">自分とフォロワーのPost一覧</h1>
      <ul className="mb-8">
        {followingUsersAllPosts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
          </li>
        ))}
      </ul>
      <h1 className="text-xl font-bold">全てのPost一覧</h1>
      <ul className="mb-8">
        {allPosts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
          </li>
        ))}
      </ul>
      <LogoutForm />
    </div>
  );
}
