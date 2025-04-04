import React from 'react'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";

const Dashboard = () => {

  

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-3xl">Dashboard</p>
      <div className="flex gap-4 mt-4">
        <LogoutLink>
          <Button>Log out</Button>
        </LogoutLink>
      </div>
    </div>
  )
}

export default Dashboard