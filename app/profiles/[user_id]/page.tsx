"use client";

// File: profiles/[user_id]/page.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the page at the url /patterns/[pattern-id] which displays a profile specified by user_id

import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import MyProfile from "@/components/pages/profile/MyProfile";
import OtherProfile from "@/components/pages/profile/OtherProfile";
import { User } from "@/types/User";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  // get profile id from URL
  const params = useParams();
  const user_id = Array.isArray(params.user_id)
    ? params.user_id[0]
    : params.user_id; // Ensure profile_id is a string

  const [profile, setProfile] = useState<User | null>(null); // store profile info
  const [user, setUser] = useState<string | null>(""); // store userId
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Redirect to home page if user is not valid
    if (user === null) {
      router.push("/"); // Redirect to home
    }
  }, [user, router]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true); // Start loading
        const userId = await getUserId(); //fetch userId
        const profileInfo = await apiService.get(`/api/user/${user_id}`); //fetch profile information and store in profile state
        setProfile(profileInfo.data);
        setUser(userId);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (user_id) {
      getInfo();
    }
  }, [user_id]); // Add profile_id as a dependency

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!profile) {
    return <div>Profile not found</div>; // Handle case where profile is not found
  }

  return (
    <>
    {/* conditionally display authenticated user's profile or other profile */}
    {user_id === user ? (
      <MyProfile profile={profile} />
    ) : (
      <OtherProfile profile={profile} />
    )}
  </>
  );
}
