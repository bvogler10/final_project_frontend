"use client";

// File: create-post/page.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the page at the url /create-post which displays a form for creating a post object

import CreatePost from "@/components/pages/create-post/CreatePost";
import { useEffect, useState } from "react";
import { getUserId } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [user, setUser] = useState<string | null>(); // to store userId
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId(); //call actions to retrieve from cookies
      setUser(userId); //store userId
    };
    getInfo();
  }, []);

  useEffect(() => {
    // Redirect to home page if user is not valid
    if (user === null) {
      router.push("/"); // Redirect to home
    }
  }, [user, router]);

  return (
    <>
      {/* If the user is not null, we can display the Create Pattern page */}
      {user && <CreatePost />}
    </>
  );
}
