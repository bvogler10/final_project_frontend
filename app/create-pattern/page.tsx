"use client";

import {CreatePattern} from "@/components/pages/create-pattern/CreatePattern";
import WelcomePage from "@/components/WelcomePage";
import { useEffect, useState } from "react";
import { getUserId } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [user,setUser] = useState<string | null>()
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      setUser(userId)
    };
    getInfo()
  }, []);

  useEffect(() => {
    // Redirect to home page if user is not valid
    if (user === null) {
      router.push("/"); // Redirect to home
    }
  }, [user, router]);

  return (
    <>
    {user && (
      <CreatePattern profile={user}/>
    )}
  </>
  )
}