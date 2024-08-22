import { siginUp } from "../lib/actions";

const SiginUpForm = () => {
  return (
    <form action={siginUp}>
      <input type="text" name="username" required placeholder="username" />
      <input type="email" name="email" required placeholder="email" />
      <input type="password" name="password" required placeholder="password" />
      <button>SiginUp</button>
    </form>
  );
};

export default SiginUpForm;
