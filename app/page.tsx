"use client";
import { HomePageComponent } from "@/components/pages/home/HomePage";
import { useEffect, useState } from "react";
import { getUserId } from "./lib/actions";
import WelcomePage from "@/components/WelcomePage";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
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

  return <>{user ? <HomePageComponent /> : <WelcomePage />}</>;
}
