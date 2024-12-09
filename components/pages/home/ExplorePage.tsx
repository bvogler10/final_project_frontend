"use client";

import { FC, useState } from "react";
import { PostList } from "./PostList";
import { PlusSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PatternList } from "./PatternList";

interface ExploreComponentProps {
  userId: string | null;
}

export const ExploreComponent: FC<ExploreComponentProps> = ({ userId }) => {
  return (
    <main className="flex-1 container mx-auto py-6 bg-background text-foreground">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row bg-card p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Explore
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover posts shared by other users. Get inspired and
            share your own creations!
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
          <PostList endpoint="/api/posts/explore" isFollowing={false} />
        ) : (
          <PostList endpoint="/api/posts" isFollowing={true} />
        )}
      </div>
    </main>
  );
};
