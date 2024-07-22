import { follow } from "../lib/actions";
interface AppProps {
  authId: string;
  id: string;
}
const FollowButton = ({ authId, id }: AppProps) => {
  const followWithId = follow.bind(null, authId, id);

  return (
    <form action={followWithId}>
      <button className="bg-blue-500 px-2 py-1 rounded-lg text-sm text-white">
        follow
      </button>
    </form>
  );
};

export default FollowButton;
