"use client";

import CreatePost from "@/components/pages/create-post/CreatePost";
import WelcomePage from "@/components/WelcomePage";
import { useEffect, useState } from "react";
import { getUserId } from "../lib/actions";

export default function CreatePostPage() {
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
      <CreatePost/>
    ) : (
      <WelcomePage/>
    )}
  </>
  )
}