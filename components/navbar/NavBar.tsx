"use client";

// File: NavBar.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the navbar component used in the layout root
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, SearchIcon } from "lucide-react";
import { getUserId } from "@/app/lib/actions";
import ProfileDropDown from "./ProfileDropDown";
import UsernameSearch from "./UserSearch";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";

// a component for the navbar
export const NavBar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // fetching the userId for use
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // a function passed to the search bar Command to handle clicks
  const handleUserSelect = (user: User | null) => {
    if (user) {
      router.push(`/profiles/${user.id}`);
    }
  };

  const isActive = (path: string) => pathname === path; //to track which tab is active on the navbar

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4 bg-popover">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {/* icon link to hoome */}
            <Link href="/" className="text-2xl font-bold flex items-center">
              <img
                src="/purple_yarn_ball.png"
                alt="App Icon"
                className="h-10 mr-2"
              />
              CloseKnit
            </Link>
            {/* word link to home, change color based on if it is active */}
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground/80 active:text-foreground/80`}
            >
              Home
            </Link>
            {/* link to explore page, change color based on if it is active */}
            <Link
              href="/explore"
              className={`transition-colors ${
                isActive("/explore")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-foreground/80 active:text-foreground/80`}
            >
              Explore
            </Link>
            {/* link to browse-patterns page, change color based on if it is active */}
            <Link
              href="/browse-patterns"
              className={`transition-colors ${
                isActive("/browse-patterns")
                  ? "text-foreground"
                  : "text-muted-foreground"
              } hover:text-foreground/80 active:text-foreground/80`}
            >
              Browse Patterns
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* pass the handleUserSelect function to the search bar */}
            {userId && <UsernameSearch onSelect={handleUserSelect} />}
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Home className="h-5 w-5" />
              <span className="sr-only">Explore</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <SearchIcon />
              <span className="sr-only">Search</span>
            </Button>
            {/* the dropdown for user icon in the upper right */}
            <ProfileDropDown userId={userId} />
          </nav>
        </div>
      </div>
    </header>
  );
};
