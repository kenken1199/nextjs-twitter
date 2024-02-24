import { PrismaClient } from "@prisma/client";
import FollowButton from "../ui/follow-button";
import UnfollowButton from "../ui/unfollow-button";
import LogoutForm from "../ui/logoutForm";
import { getSession } from "../lib/actions";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  const allUsers = await prisma.user.findMany();
  // console.dir(allUsers, { depth: null });
  const authId = session.userId;

  return (
    <div className="m-8">
      <h1 className="text-xl font-bold">ユーザ一覧</h1>
      <div>{session.username}のページ</div>
      <ul className="mt-8">
        {allUsers.map((user) => (
          <li key={user.id}>
            <span>{user.id.includes(authId) ? <div></div> : user.name}</span>
            <div>
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
      <LogoutForm />
    </div>
  );
}
