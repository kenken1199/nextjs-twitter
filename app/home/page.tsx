import { PrismaClient } from "@prisma/client";
import FollowButton from "../ui/follow-button";
import UnfollowButton from "../ui/unfollow-button";
import LogoutForm from "../ui/logoutForm";
import { getSession } from "../lib/actions";

const prisma = new PrismaClient();

export default async function Home() {
  const session = await getSession();
  const allUsers = await prisma.user.findMany();
  // console.dir(allUsers, { depth: null });
  const bobId = "65d3dd73ed1f98ea769d78ec";
  return (
    <div className="m-8">
      <h1 className="text-xl font-bold">ユーザ一覧</h1>
      <div>{session.username}のページ</div>
      <ul className="mt-8">
        {allUsers.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <div>
              {user.followedByIDs.includes(session.userId) ? (
                <UnfollowButton bobId={bobId} id={user.id} />
              ) : (
                <FollowButton bobId={bobId} id={user.id} />
              )}
            </div>
          </li>
        ))}
      </ul>
      <LogoutForm />
    </div>
  );
}
