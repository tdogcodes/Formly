import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-3xl">Main Page Test</p>
      <div className="flex gap-4 mt-4">
        <LoginLink>
          <Button>Sign in</Button>
        </LoginLink>
        <RegisterLink>
          <Button variant="secondary">Sign up</Button>
        </RegisterLink>
      </div>
    </div>
  );
}
