// Define the PostList component

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { PostListItem } from "./PostListItem";
import { Post } from "@/types/Post";

interface PostListProps {
  endpoint: string;
}

export const PostList: FC<PostListProps> = ({ endpoint }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = async () => {
    const tmpPosts = await apiService.get(endpoint);

    const sortedPosts = tmpPosts.data.sort((a: Post, b: Post) => {
      if (new Date(b.created_at) > new Date(a.created_at)) return 1;
      if (new Date(b.created_at) < new Date(a.created_at)) return -1;
      return 0;
    });
    setPosts(sortedPosts);
  };

  useEffect(() => {
    getPosts();
  }, [endpoint]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} isFollowing={false} />
      ))}
    </div>
  );
};
