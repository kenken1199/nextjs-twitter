import { follow } from "../lib/actions";

const FollowButton = ({ authId, id }) => {
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
