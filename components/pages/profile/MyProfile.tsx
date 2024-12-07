"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Bookmark,
  LinkIcon,
  Edit,
  Upload,
} from "lucide-react";
import { getUserId } from "@/app/lib/actions";
import { InventoryList } from "./InventoryList";
import { PostList } from "../home/PostList";
import apiService from "@/app/services/apiService";
import { EditProfileDialog } from "./EditProfileDialog";
import { User } from "@/types/User";
import { CreateInventoryItemDialog } from "./CreateInventoryItemDialog";

interface MyProfileProps {
  profile: User
}

export default function MyProfile({ profile } : MyProfileProps) {

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
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                {profile.link}
              </a>
            )}
          </div>
        </div>
        <EditProfileDialog profile={profile} />
        <CreateInventoryItemDialog profile={profile}/>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid gap-4">
            <PostList endpoint={`/api/user_posts/${profile.id}`} />
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="mt-6">
          <div className="grid gap-4">
            <InventoryList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
