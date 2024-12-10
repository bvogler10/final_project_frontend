"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import apiService from "@/app/services/apiService";
import { LogoutButton } from "@/components/navbar/LogoutButton";
import LoginDialog from "@/components/navbar/LoginDialog";
import SignUpDialog from "@/components/navbar/SignUpDialog";

interface ProfileDropDownProps {
  userId: string | null;
}
// a dropdown for the user to navigate to profile or log out
export default function ProfileDropDown({ userId }: ProfileDropDownProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetch the user information
    const fetchUser = async () => {
      try {
        const userInfo = await apiService.get(`/api/user/${userId}`);
        setUser(userInfo.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // if the userId is valid, fetch the information for use in the dropdown
    if (userId) {
      void fetchUser();
    } else {
      setUser(null);
    }
  }, [userId]);

  return (
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            {/* show the user's avatar */}
            <AvatarImage src={user?.avatar} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mt-2 ml-2 p-2 rounded-md shadow-md"
          sideOffset={8} // Ensures there's an offset from the trigger
          align="end"
        >
          {userId && (
            <>
              <DropdownMenuLabel className="text-center">
                Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center"
              >
                {/* navigate to the user profile */}
                <Link href={`/profiles/${userId}`}>My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <div className="flex flex-col space-y-2">
            {/* if the user is logged in, show log out otherwise show sign up/log in */}
            {userId ? (
              <LogoutButton />
            ) : (
              <>
                <LoginDialog />
                <SignUpDialog />
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
