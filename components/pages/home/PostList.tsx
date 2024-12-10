// File: PostList.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component displaying a list of Post objects

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { PostListItem } from "./PostListItem";
import { Post } from "@/types/Post";

interface PostListProps {
  endpoint: string;
  isFollowing: boolean;
}
// a component for a list of posts
export const PostList: FC<PostListProps> = ({ endpoint, isFollowing }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // fetch the posts using specified endpoints
    const getPosts = async () => {
      const tmpPosts = await apiService.get(endpoint);

      setPosts(tmpPosts.data);
    };
    void getPosts();
  }, [endpoint]);

  return (
    // map each post to its own style
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} isFollowing={isFollowing} />
      ))}
    </div>
  );
};
