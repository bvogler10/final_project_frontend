"use client";
import { HomePageComponent } from "@/components/pages/home/HomePage";
import { useEffect, useState } from "react";
import { getUserId } from "./lib/actions";
import WelcomePage from "@/components/WelcomePage";

export default function Home() {
  const [user,setUser] = useState<string | null>()
  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      setUser(userId)
    };
    getInfo()
  }, []);
  return (
    <>
      {user ? (
        <HomePageComponent />
      ) : (
        <WelcomePage/>
      )}
    </>
  )
};
