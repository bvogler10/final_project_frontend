import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { Follow } from "@/types/Follow";
import { FollowListItem } from "./FollowListItem";

interface FollowListProps {
  follows: Follow[];
}

export const FollowList: React.FC<FollowListProps> = ({ follows }) => {
    
    
    
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {follows.map((follow) => (
            <FollowListItem key={follow.id} follow={follow} />
          ))}
        </div>
      );
};
