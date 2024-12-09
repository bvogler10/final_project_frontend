"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, SearchIcon } from "lucide-react";
import { getUserId } from "@/app/lib/actions";
import ProfileDropDown from "./ProfileDropDown";
import UsernameSearch from "./UserSearch";
import { useRouter } from "next/navigation";
import type { User } from "@/types/User";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleUserSelect = (user: User | null) => {
    if (user) {
      router.push(`/profiles/${user.id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4 bg-popover">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <img
                src="/purple_yarn_ball.png"
                alt="App Icon"
                className="h-10 mr-2"
              />
              CloseKnit
            </Link>
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground/80 text-foreground active:text-foreground/80"
            >
              Explore
            </Link>
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-muted-foreground active:text-foreground/80"
            >
              Home
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          <UsernameSearch onSelect={handleUserSelect}/>
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
            <ProfileDropDown userId={userId} />
          </nav>
        </div>
      </div>
    </header>
  );
};
