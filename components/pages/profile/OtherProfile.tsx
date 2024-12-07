"use client";

import { useState } from "react";
import { Home, LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostList } from "../home/PostList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/User";

interface OtherProfileProps {
    profile: User
}

export default function OtherProfile({ profile } : OtherProfileProps ) {
  const [activeTab, setActiveTab] = useState("posts");
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profile.avatar? profile.avatar : ""} alt={profile.username} />
          <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-muted-foreground">{profile.bio}</p>
          {profile.link && (
            <a href={profile.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
              <LinkIcon className="w-4 h-4 mr-1" />
              {profile.link}
            </a>
          )}
        </div>
      </div>
    </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="posts"
          >
            <Home className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="patterns"
          >
            Patterns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            <PostList endpoint="/api/posts" />
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            <PostList endpoint="/api/posts" />
          </div>
        </TabsContent>
      </Tabs>
      </div>
  );
};
