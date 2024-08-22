import { addPost } from "../lib/actions";
import { Button } from "@/components/ui/button";

const AddPost = () => {
  return (
    <form action={addPost}>
      <input type="text" name="text" required placeholder="今何してる？" />
      <Button>Post</Button>
    </form>
  );
};

export default AddPost;
