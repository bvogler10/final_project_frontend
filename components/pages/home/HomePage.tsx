"use client";

import { useState } from "react";
import { PostList } from "./PostList";
import { Home, Compass, PlusSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <main className="flex-1 container mx-auto py-6 bg-background text-foreground">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row bg-card p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Explore
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover posts and patterns shared by other users. Get inspired and share your own creations!
          </p>
        </div>
        <Link href="/create-post">
        <Button className="mt-4 sm:mt-0 sm:ml-4" >
        <PlusSquare className="h-5 w-5" />Create Post
        </Button>
        </Link>
        
      </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="feed"
          >
            <Home className="h-4 w-4 mr-2" />
            Following
          </TabsTrigger>
          <TabsTrigger
            value="explore"
          >
            <Compass className="h-4 w-4 mr-2" />
            Explore
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            <PostList endpoint="/api/posts" />
          </div>
        </TabsContent>
        <TabsContent value="explore" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            <PostList endpoint="/api/posts" />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};
