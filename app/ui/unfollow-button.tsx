import { unfollow } from "../lib/actions";
interface AppProps {
  authId: string;
  id: string;
}
const UnfollowButton = ({ authId, id }: AppProps) => {
  const unfollowWithId = unfollow.bind(null, authId, id);

  return (
    <form action={unfollowWithId}>
      <button className="bg-red-500 px-2 py-1 rounded-lg text-sm text-white">
        unfollow
      </button>
    </form>
  );
};

export default UnfollowButton;
