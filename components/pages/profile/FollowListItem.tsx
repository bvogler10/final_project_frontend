"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventoryItem } from "@/types/InventoryItem";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { Follow } from "@/types/Follow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FollowListItemProps {
  follow: Follow;
}

export const FollowListItem: FC<FollowListItemProps> = ({ follow }) => {
  const followerInfo = follow.follow_info

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={followerInfo.avatar} alt={followerInfo.username} />
          <AvatarFallback>{followerInfo.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{followerInfo.username}</span>
          <span className="text-xs text-muted-foreground">{followerInfo.name}</span>
        </div>
      </div>
    </div>
  );
};
