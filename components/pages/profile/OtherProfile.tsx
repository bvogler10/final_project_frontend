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

interface OtherProfileProps {
    profile: User
}

export default function OtherProfile({ profile } : OtherProfileProps ) {
  const [activeTab, setActiveTab] = useState("posts");
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogList, setDialogList] = useState<Follow[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      const followers = await apiService.get(`/api/user/${profile.id}/followers`);
      const following = await apiService.get(`/api/user/${profile.id}/following`);

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
            <PostList endpoint={`/api/user_posts/${profile.id}`} isFollowing={true}/>
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
};
