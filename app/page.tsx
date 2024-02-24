import LoginForm from "./ui/LoginForm";
import SiginUpForm from "./ui/siginUpForm";

const RootPage = () => {
  return (
    <div>
      <h1>RootPage</h1>
      <p>ログインはこちら</p>
      <LoginForm />
      <p>サインアップはこちら</p>
      <SiginUpForm />
    </div>
  );
};

export default RootPage;
