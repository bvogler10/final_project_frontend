"use client";

import { useRouter } from "next/navigation";

import { resetAuthCookies } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return <Button onClick={submitLogout}>Log out</Button>;
};
