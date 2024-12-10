"use client";

// File: explore/page.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the page at the url /explore which displays posts by all users (if not logged in) or posts by users 
// the current user does not follow

import { ExploreComponent } from "@/components/pages/home/ExplorePage";
import { useEffect, useState } from "react";
import { getUserId } from "../lib/actions";

export default function Explore() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId(); // fetch userId
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
      {/* Show explore tailored to user OR logged out explore view (all except user or all users) */}
      {user ? (
        <ExploreComponent userId={user} />
      ) : (
        <ExploreComponent userId={null} />
      )}
    </>
  );
}
