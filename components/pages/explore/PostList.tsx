// Define the PostList component

import { FC, useEffect, useState } from "react";

import { PostListItem } from "./PostListItem";
import { Post } from "@/types/Post";


export const PostList: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const getPosts = async () => {
        const url = 'http://localhost:8000/api/posts';

        await fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((json) => {
            console.log('json', json);
            const sortedPosts = json.data.sort((a: Post, b: Post) => {
                if (new Date(b.created_at) > new Date(a.created_at)) return 1;
                if (new Date(b.created_at) < new Date(a.created_at)) return -1;
                return 0;
            });
            setPosts(sortedPosts);
        })

        .catch((error) => {
            console.log('error', error);
        })
    };

    useEffect(() => {
        getPosts();
    }, []);
  
    return (
      <div className="space-y-6 grid place-items-center">
        {posts.map((post) => (            
          <PostListItem
            key={post.id}
            id = {post.id}
            user = {post.user}
            user_info={post.user_info}
            created_at={post.created_at}
            image_url={post.image_url}
            caption={post.caption}
          />
        ))}
      </div>
    );
  };