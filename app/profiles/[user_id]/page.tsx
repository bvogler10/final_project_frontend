"use client";

import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import MyProfile from "@/components/pages/profile/MyProfile";
import OtherProfile from "@/components/pages/profile/OtherProfile";
import { User } from "@/types/User";
import { getCipherInfo } from "crypto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const profile_id = Array.isArray(params.user_id)
    ? params.user_id[0]
    : params.user_id; // Ensure profile_id is a string

  const [profile, setProfile] = useState<User | null>(null);
  const [user, setUser] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true); // Start loading
        const userId = await getUserId();
        const profileInfo = await apiService.get(`/api/user/${profile_id}`);
        setProfile(profileInfo.data);
        setUser(userId);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (profile_id) {
      getInfo();
    }
  }, [profile_id]); // Add profile_id as a dependency

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!profile) {
    return <div>Profile not found</div>; // Handle case where profile is not found
  }

  return (
    <>
      {profile_id === user ? (
        <MyProfile profile={profile} />
      ) : (
        <OtherProfile profile={profile} />
      )}
    </>
  );
}
