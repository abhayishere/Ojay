// pages/posts/[postId].js
'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PostDetail{
    id:number;
    title:string;
    content:string;
    datePosted:string;
    author:string;
}

export default function PostDetail({params}:{
    params:{
      postId: any;
  }
  }) {
  const { postId } = params
  const [post, setPost] = useState<PostDetail | null>(null);;

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;
      const res = await fetch(`http://localhost:8080/posts/${postId}`, { cache: 'no-store' });
      const data = await res.json();
      setPost(data);
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <span>By {post.author}</span>
    </article>
  );
}
