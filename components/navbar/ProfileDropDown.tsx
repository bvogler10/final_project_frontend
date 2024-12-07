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

export default function ProfileDropDown({ userId }: ProfileDropDownProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await apiService.get(`/api/user/${userId}`);
        setUser(userInfo.data);
        console.log(userInfo)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userId) {
      void fetchUser();
    }
  }, [userId]);

  return (
    <div className="hidden md:flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 ml-2 p-2 rounded-md shadow-md"
  sideOffset={8} // Ensures there's an offset from the trigger
  align="end">
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
                <Link href={`/profiles/${userId}`}>My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <div className="flex flex-col">
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