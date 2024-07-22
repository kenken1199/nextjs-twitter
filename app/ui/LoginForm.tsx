import { login } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <form action={login}>
      {/* <input type="email" name="email" required placeholder="email" /> */}
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" required placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
        <Label htmlFor="email">Password</Label>
        <Input
          type="password"
          name="password"
          required
          placeholder="Password"
        />
      </div>
      <Button className="w-96">Login</Button>
    </form>
  );
};

export default LoginForm;
