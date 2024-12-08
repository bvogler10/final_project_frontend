"use client";

import { useEffect, useState } from "react";
import { Home, LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostList } from "../home/PostList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/User";
import { Follow } from "@/types/Follow";
import apiService from "@/app/services/apiService";
import { FollowDialog } from "./FollowDialog";
import ActionsDropDown from "./ActionsDropDown";
import { PatternList } from "../home/PatternList";
import { getUserId } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";

interface OtherProfileProps {
  profile: User;
}

export default function OtherProfile({ profile }: OtherProfileProps) {
  const [activeTab, setActiveTab] = useState("posts");
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogList, setDialogList] = useState<Follow[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      const tmpFollowers = await apiService.get(
        `/api/user/${profile.id}/followers`
      );
      const tmpFollowing = await apiService.get(
        `/api/user/${profile.id}/following`
      );

      setFollowers(tmpFollowers.data);
      setFollowing(tmpFollowing.data);

      // Check if the authenticated user is in the followers list
      const isUserFollowing = followers.some(
        (follower) => follower.follow_info.id === userId
      );
      setIsFollowing(isUserFollowing);
    };

    void getInfo();
  }, []);

  const openDialog = (title: string, list: Follow[]) => {
    setDialogTitle(title);
    setDialogList(list);
    setIsDialogOpen(true);
  };

  const handleFollow = async () => {
    const otherUser = profile.id;
    try {
      console.log("following", otherUser);
      const response = await apiService.follow(`/api/user/follow/${otherUser}`);
      if (response) {
        console.log("Follow Response:", response);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

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
            <div className="flex">
              {" "}
              <h1 className="text-2xl font-bold">{profile.username}</h1>{" "}
              {!isFollowing && (
                <Button
                  onClick={() => handleFollow()}
                  size="sm"
                  className="ml-auto bg-secondary"
                >
                  Follow
                </Button>
              )}
            </div>
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
            <div
              className="text-center"
              onClick={() => openDialog("Followers", followers)}
            >
              <p className="text-foreground">Followers</p>
              <p className="text-xl font-semibold">{followers.length}</p>{" "}
            </div>
            <div
              className="text-center"
              onClick={() => openDialog("Following", following)}
            >
              <p className="text-foreground">Following</p>
              <p className="text-xl font-semibold">{following.length}</p>{" "}
            </div>
          </div>
        </div>
        <FollowDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={dialogTitle}
          list={dialogList}
        />
      </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">
            <Home className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            <PostList
              endpoint={`/api/user_posts/${profile.id}`}
              isFollowing={isFollowing}
            />
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="mt-6">
          {/* Patterns */}
          <PatternList
            endpoint={`/api/user_patterns/${profile.id}`}
            isFollowing={isFollowing}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
