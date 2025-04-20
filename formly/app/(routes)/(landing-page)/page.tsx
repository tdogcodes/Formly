import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import HampsterLoader from "@/components/hampster";
import { defaultBackgroundColor } from "@/constant/index";
import CubeLogo from "@/components/cubeLogo";

export default function LandingPage() {
  return (
    <div className="flex absolute h-full w-full flex-col justify-center items-center bg-secondary/50"  style={{
      width: "full",
      height: "full",
      backgroundColor: "#ffffff",
      backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 3px, hsl(262, 95%, 83%) 0)",
      backgroundSize: "30px 30px",
      backgroundPosition: "-5px -5px",
    }}>
      <HampsterLoader />
      <CubeLogo outermost="mt-1 p-8 px-16" text="Formly" />
      <p className="text-2xl text-center my-8 font-semibold text-gray-900">The easiest drag and drop <br/> form building platform.</p>
      <div className="flex gap-4">
        <LoginLink>
        <Button className="p-8 text-lg">Sign in</Button>
        </LoginLink>
        <RegisterLink>
          <Button className="p-8 text-lg" variant="secondary">Sign up</Button>
        </RegisterLink>
      </div>
      <footer className="fixed bottom-2 text-sm">
          <span className="pr-10">Sandoval Solutions - 2025</span>
          <span className="pr-10">Tracy Sandoval</span>
          <span className="pr-10">trxycsgo@gmail.com</span>
      </footer>
    </div>
  );
}
