"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, PlusSquare, Ribbon } from "lucide-react";
import { InventoryList } from "./InventoryList";
import { PostList } from "../home/PostList";
import { EditProfileDialog } from "./EditProfileDialog";
import { User } from "@/types/User";
import { Follow } from "@/types/Follow";

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
  profile: User;
}

export default function MyProfile({ profile }: MyProfileProps) {
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      const followers = await apiService.get(`/api/user/${userId}/followers`);
      const following = await apiService.get(`/api/user/${userId}/following`);
  
      setFollowers(followers.data);
      setFollowing(following.data);
    };

    void getInfo();
  }, []);

  return (
    <div className="container w-full mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={profile.avatar ? profile.avatar : ""}
              alt={profile.username}
            />
            <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex"> <h1 className="text-2xl font-bold pr-5">{profile.username}</h1> <ActionsDropDown userId={profile.id} /></div>
            
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
        {/* Following/Follower count section */}
        <div className="mb-6">
          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-foreground">Followers</p>
              <p className="text-xl font-semibold">{followers.length}</p>{" "}
            </div>
            <div className="text-center">
              <p className="text-foreground">Following</p>
              <p className="text-xl font-semibold">{following.length}</p>{" "}
            </div>
          </div>
        </div>
        
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="patterns">My Patterns</TabsTrigger>
          <TabsTrigger value="inventory">My Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid gap-4">
            <PostList
              endpoint={`/api/user_posts/${profile.id}`}
              isFollowing={true}
            />
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="mt-6">
          <div className="grid gap-4">
            <PatternList
              endpoint={`/api/user_patterns/${profile.id}`}
              isFollowing={true}
            />
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
