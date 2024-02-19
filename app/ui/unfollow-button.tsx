import { unfollow } from "../lib/actions";

const UnfollowButton = ({ bobId, id }) => {
  const unfollowWithId = unfollow.bind(null, bobId, id);

  return (
    <form action={unfollowWithId}>
      <button className="bg-red-500 px-2 py-1 rounded-lg text-sm text-white">
        unfollow
      </button>
    </form>
  );
};

export default UnfollowButton;
