"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LinkIcon,
  PlusSquare,
  Ribbon
} from "lucide-react";
import { InventoryList } from "./InventoryList";
import { PostList } from "../home/PostList";
import { EditProfileDialog } from "./EditProfileDialog";
import { User } from "@/types/User";
import { Pattern } from "@/types/Pattern";

import { CreateInventoryItemDialog } from "./CreateInventoryItemDialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActionsDropDown from "./ActionsDropDown";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { PatternListItem } from "../home/PatternListItem";
import { PatternList } from "../home/PatternList";


interface MyProfileProps {
  profile: User
}

export default function MyProfile({ profile } : MyProfileProps) {
 const [pattern, setPattern] = useState<Pattern | null>()

  const getPatterns = async () => {
    const userId = await getUserId()
    const tmpInventory = await apiService.get("/api/patterns");
    
    console.log(tmpInventory);
    setPattern(tmpInventory.data[0])
  };

  useEffect(() => {
    getPatterns();
  }, []);

  return (
    <div className="container w-full mx-auto py-8">
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
        <ActionsDropDown userId={profile.id}/>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="patterns">My Patterns</TabsTrigger>
          <TabsTrigger value="inventory">My Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid gap-4">
            <PostList endpoint={`/api/user_posts/${profile.id}`} isFollowing={true} />
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="mt-6">
          <div className="grid gap-4">
            <PatternList endpoint={`/api/user_patterns/${profile.id}`} isFollowing={true}/>
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
