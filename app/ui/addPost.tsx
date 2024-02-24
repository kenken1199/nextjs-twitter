import { addPost } from "../lib/actions";

const AddPost = () => {
  return (
    <form action={addPost}>
      <input type="text" name="text" required placeholder="今何してる？" />
      <button>Post</button>
    </form>
  );
};

export default AddPost;
