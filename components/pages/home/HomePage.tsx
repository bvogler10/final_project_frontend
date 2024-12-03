"use client";

import { useState } from "react";
import { PostList } from "./PostList";
import { Home, Compass } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <main className="flex-1 container mx-auto py-6 bg-background text-foreground">
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
