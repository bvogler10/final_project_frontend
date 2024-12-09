"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon } from "lucide-react";
import { InventoryList } from "./InventoryList";
import { PostList } from "../home/PostList";
import { User } from "@/types/User";
import { Follow } from "@/types/Follow";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import ActionsDropDown from "./ActionsDropDown";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { PatternList } from "../home/PatternList";
import { FollowDialog } from "./FollowDialog";

interface MyProfileProps {
  profile: User;
}

export default function MyProfile({ profile }: MyProfileProps) {
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogList, setDialogList] = useState<Follow[]>([]);

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

  const openDialog = (title: string, list: Follow[]) => {
    setDialogTitle(title);
    setDialogList(list);
    setIsDialogOpen(true);
  };

  return (
    <div className="container w-full mx-auto py-8">
      <div className="container w-full mx-auto py-8 px-4">
        <Card className="overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage
                  src={profile.avatar || ""}
                  alt={profile.username}
                />
                <AvatarFallback>
                  {profile.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold mb-2 md:mb-0">
                    {profile.username}
                  </h1>
                  <ActionsDropDown userId={profile.id} />
                </div>
                <p className="text-muted-foreground mb-4">{profile.bio}</p>
                {profile.link && (
                  <a
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start text-primary hover:underline mb-4"
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    {profile.link}
                  </a>
                )}
                <div className="flex justify-center md:justify-start space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => openDialog("Followers", followers)}
                  >
                    <span className="font-semibold">{followers.length}</span>
                    <span className="ml-1">Followers</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => openDialog("Following", following)}
                  >
                    <span className="font-semibold">{following.length}</span>
                    <span className="ml-1">Following</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FollowDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={dialogTitle}
          list={dialogList}
        />
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
