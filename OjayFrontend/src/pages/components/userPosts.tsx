// UserPosts.js
import React, { useState, useEffect } from 'react';

interface Post {
    id: string; // Replace with appropriate types for each property
    title: string;
    content: string;
    datePosted: string;
    author:string;
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts by the user from a backend service here
    // For demonstration purposes, we're using static data
    const userPosts = [
      { id: "1", title: 'Post 1', content: 'Content for post 1', datePosted:"12121","author":"2121"},
      { id: "2", title: 'Post 2', content: 'Content for post 2' ,datePosted:"12121","author":"2121"},
      // ... other posts
    ];
    setPosts(userPosts);
  }, []);

  return (
    <div>
      <h2>Posts by you:</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
