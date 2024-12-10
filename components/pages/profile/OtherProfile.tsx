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
import { PatternList } from "../home/PatternList";
import { getUserId } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OtherProfileProps {
  profile: User;
}
// component for other profile, almost identical to my profile
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
  });

  useEffect(() => {
    const checkIfFollowing = async () => {
      const userId = await getUserId();
      const isUserFollowing = followers.some(
        (follower) => follower.follow_info.id === userId
      );
      setIsFollowing(isUserFollowing);
    };

    void checkIfFollowing();
  }, [followers]);

  const openDialog = (title: string, list: Follow[]) => {
    setDialogTitle(title);
    setDialogList(list);
    setIsDialogOpen(true);
  };

  const handleFollow = async () => {
    const otherUser = profile.id;
    try {
      const response = await apiService.follow(`/api/user/follow/${otherUser}`);
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.error("Error:", e);
    }
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
                  {!isFollowing ? (
                    <Button
                      onClick={handleFollow}
                      variant="secondary"
                      className="w-full md:w-auto"
                    >
                      Follow
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="w-full md:w-auto">
                      Following
                    </Badge>
                  )}
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
                <div className="flex justify-center md:justify-start space-x-8">
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
              isFollowing={true}
            />
          </div>
        </TabsContent>
        <TabsContent value="patterns" className="mt-6">
          {/* Patterns */}
          <PatternList
            endpoint={`/api/user_patterns/${profile.id}`}
            isFollowing={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
