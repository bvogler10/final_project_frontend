"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Follow } from "@/types/Follow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FollowListItemProps {
  follow: Follow;
}

export const FollowListItem: FC<FollowListItemProps> = ({ follow }) => {
  const followInfo = follow.follow_info
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/profiles/${followInfo.id}`);
  };

  return (
    <div className="flex items-center justify-between py-2" onClick={handleNavigation}>
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={followInfo.avatar} alt={followInfo.username} />
          <AvatarFallback>{followInfo.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{followInfo.username}</span>
          <span className="text-xs text-muted-foreground">{followInfo.name}</span>
        </div>
      </div>
    </div>
  );
};
