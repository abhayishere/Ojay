
import RootLayout from './layout';
import './globals.css'
import { useEffect, useState } from 'react';
import UserProfileStats from '@/pages/components/userProfileStats';
import './home.css'
import { useAuth } from './context/AuthContext';
import TopRated from '@/pages/components/ratings';
import PostStats from '@/pages/components/postStats';
import Link from 'next/link';

interface Post {
    id: string; // Replace with appropriate types for each property
    title: string;
    content: string;
    datePosted: string;
    author:string;
}


export default async function Home() {
   const res=await fetch("http://localhost:8080/posts",{cache:'no-store'})
   const posts=await res.json()

  return(
        <div className='home'>
          <div className="posts">
            {posts.map((post:Post) => (
              <div key={post.id} className="post">
                <h2>
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <p>{`${post.content.slice(0, 200)}${post.content.length > 40 ? '...' : ''}`}</p>
                <span>By {post.author}</span> {/* Display the author's name */}
              </div>
            ))}
          </div>
          <div className="stats">
            <UserProfileStats />
            <TopRated />
            <PostStats />
          </div>
        </div>
  )
}