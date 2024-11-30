// Define the PostList component

import { FC, useEffect } from "react";

import { PostListItem } from "./PostListItem";

export const PostList: FC = () => {
    const posts = [
      {
        username: 'John Doe',
        userAvatar: '/placeholder-user.jpg',
        avatarFallback: 'JD',
        timestamp: '2 hours ago',
        imageSrc: '/placeholder.svg?height=300&width=600',
        caption: 'Just finished this beautiful blanket! 🧶 #crochet #blanket',
      },
      {
        username: 'Jane Smith',
        userAvatar: '/placeholder-user2.jpg',
        avatarFallback: 'JS',
        timestamp: '5 hours ago',
        imageSrc: '/placeholder2.svg?height=300&width=600',
        caption: 'Loving this new scarf I made! 🧣 #knitting',
      },
    ];

    const getPosts = async () => {
        const url = 'http://localhost:8000/api/posts';

        await fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((json) => {
            console.log('json', json);
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
            key={index}
            username={post.username}
            userAvatar={post.userAvatar}
            avatarFallback={post.avatarFallback}
            timestamp={post.timestamp}
            imageSrc={post.imageSrc}
            caption={post.caption}
          />
        ))}
      </div>
    );
  };