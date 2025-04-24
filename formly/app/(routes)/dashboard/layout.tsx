import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/_common/header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }
  return (
    <div className="flex min-h-screen w-full flex-col"  style={{
      width: "full",
      height: "full",
      backgroundColor: "#ffffff",
      backgroundImage: `radial-gradient(rgba(12, 12, 12,) 3px, hsl(262, 95%, 83%, .5) 0)`,
      backgroundSize: "30px 30px",
      backgroundPosition: "-5px -5px",
    }}>
      <div className="w-full flex-1">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}