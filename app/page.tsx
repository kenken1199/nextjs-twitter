import LoginForm from "./ui/LoginForm";
import SiginUpForm from "./ui/siginUpForm";

const RootPage = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-48 flex flex-col items-center ">
        <div>
          <h1>RootPage</h1>
        </div>
        <div>
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="w-96 mt-10">
          <LoginForm />
        </div>
        {/* <p>サインアップはこちら</p>
        <SiginUpForm /> */}
      </div>
    </div>
  );
};

export default RootPage;
