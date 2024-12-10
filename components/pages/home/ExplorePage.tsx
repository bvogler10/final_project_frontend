"use client";

// File: ExplorePage.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component displaying explore content

import { FC } from "react";
import { PostList } from "./PostList";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ExploreComponentProps {
  userId: string | null;
}

// explore is accessible even when logged out, the difference is you don't see your own posts
export const ExploreComponent: FC<ExploreComponentProps> = ({ userId }) => {
  return (
    <main className="flex-1 container mx-auto py-6 bg-background text-foreground">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row bg-card p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Explore
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover posts shared by other users. Get inspired and share your
            own creations!
          </p>
        </div>
        <Link href="/create-post">
          <Button className="mt-4 sm:mt-0 sm:ml-4">
            <PlusSquare className="h-5 w-5" /> Create Post
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        {userId ? (
          // we are not following these people
          <PostList endpoint="/api/posts/explore" isFollowing={false} />
        ) : (
          // we are not logged in so we cannot follow (do not show follow button)
          <PostList endpoint="/api/posts" isFollowing={true} />
        )}
      </div>
    </main>
  );
};
