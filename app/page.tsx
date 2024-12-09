"use client";
import { useEffect, useState } from "react";
import { getUserId } from "./lib/actions";
import WelcomePage from "@/components/WelcomePage";
import { HomeComponent } from "@/components/pages/home/HomePage";

export default function Home() {
  const [user, setUser] = useState<string | null>(null); //to store user
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      setUser(userId);
      setLoading(false); // Set loading to false when data is loaded
    };
    getInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while waiting for user data
  }

  return (
    <>
      {/* If the user is logged in, show Home page, otherwise show welcome page */}
      {user ? <HomeComponent userId={user} /> : <WelcomePage />}
    </>
  );
}
