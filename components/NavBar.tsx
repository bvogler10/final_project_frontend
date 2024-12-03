import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Search,
  Bell,
  MessageSquare,
  User,
  PlusSquare,
} from "lucide-react";
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";
import { LogoutButton } from "./LogoutButton";
import { getUserId } from "@/app/lib/actions";

export const NavBar = async () => {
  const userId = await getUserId();

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
            <a
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/"
            >
              Explore
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
              href="/inventory"
            >
              My Inventory
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
              href="/my-posts"
            >
              My Posts
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input placeholder="Search patterns..." />
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Home className="h-5 w-5" />
              <span className="sr-only">Explore</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Link href="/create-post">
              <Button variant="ghost" size="icon">
                <PlusSquare className="h-5 w-5" />
                <span className="sr-only">New Post</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            {!userId ? (
              <>
                <SignUpDialog />
                <LoginDialog />
              </>
            ) : (
              <LogoutButton />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
