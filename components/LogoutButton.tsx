"use client";

import { useRouter } from "next/navigation";

import { resetAuthCookies } from "@/app/lib/actions";
import { Button } from "./ui/button";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    router.push("/");
  };

  return <Button onClick={submitLogout}>Log out</Button>;
};
