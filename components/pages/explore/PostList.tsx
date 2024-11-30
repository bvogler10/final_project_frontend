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
            setPosts(json.data)
        })

        .catch((error) => {
            console.log('error', error);
        })
    };

    useEffect(() => {
        getPosts();
    }, []);
  
    return (
      <div className="space-y-6">
        {posts.map((post, index) => (            
          <PostListItem
            id = {post.id}
            user = {post.user}
            user_info={post.user_info}
            created_at={post.created_at}
            image={post.image}
            caption={post.caption}
          />
        ))}
      </div>
    );
  };