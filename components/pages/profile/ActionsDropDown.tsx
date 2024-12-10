"use client";

// File: ActionsDropDown.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the drop down component in the user profile

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import apiService from "@/app/services/apiService";
import { EditProfileDialog } from "./EditProfileDialog";
import { HiDotsHorizontal } from "react-icons/hi"; // Importing the 3-dots icon from the react-icons library
import { CreateInventoryItemDialog } from "./CreateInventoryItemDialog";

interface ActionsDropDownProps {
  userId: string | null;
}
// a drodown in the user profile to handle actions such as updating profile, creating post
export default function ActionsDropDown({ userId }: ActionsDropDownProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // get user information
    const fetchUser = async () => {
      try {
        const userInfo = await apiService.get(`/api/user/${userId}`);
        setUser(userInfo.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

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
          <div className="flex items-center space-x-2">
            <HiDotsHorizontal className="text-lg w-8 h-8" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mt-2 ml-2 p-2 rounded-md shadow-md"
          sideOffset={8} // Ensures there's an offset from the trigger
          align="end"
        >
          {userId && (
            <>
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center items-center text-center"
              >
                {/* link to create post */}
                <Link href={`/create-post`}>Create Post</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center items-center text-center"
              >
                {/* link to create pattern */}
                <Link href={`/create-pattern`}>Create Pattern</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center items-center text-center"
              >
                {/* show the edit profile dialog */}
                {user && <EditProfileDialog profile={user} />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center items-center text-center"
              >
                {/* show create inventory dialog */}
                {user && <CreateInventoryItemDialog profile={user} />}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
