import { login } from "../lib/actions";

const LoginForm = () => {
  return (
    <form action={login}>
      <input type="email" name="email" required placeholder="email" />
      <input type="password" name="password" required placeholder="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
