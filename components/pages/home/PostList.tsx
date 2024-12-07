// Define the PostList component

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { PostListItem } from "./PostListItem";
import { Post } from "@/types/Post";

interface PostListProps {
  endpoint: string;
  isFollowing: boolean;
}

export const PostList: FC<PostListProps> = ({ endpoint, isFollowing }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = async () => {
    const tmpPosts = await apiService.get(endpoint);

    setPosts(tmpPosts.data);
  };

  useEffect(() => {
    getPosts();
  }, [endpoint]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} isFollowing={isFollowing} />
      ))}
    </div>
  );
};
