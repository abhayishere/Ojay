// ProfilePage.js
'use client'
import React, { useState } from 'react';
import UserProfile from '../../pages/components/userProfile';
import UserPosts from '../../pages/components/userPosts';
import './UserProfile.css'
import '../../pages/styles/UserProfile.module.css'
import { useAuth } from '../context/AuthContext';
import Submissions from '@/pages/components/submissions';
import ProblemsSolved from '@/pages/components/problemsSolved';

const ProfilePage = () => {
  const [view, setView] = useState('profile'); // 'profile' or 'posts'

  const { isLoggedIn, username, logout } = useAuth();
  return (
    <div>
      <header className='header2'>
        <nav>
          <button onClick={() => setView('profile')}>{username}'s Profile</button>
          <button onClick={() => setView('posts')}>Posts</button>
          <button onClick={() => setView('submissions')}>Submissions</button>
          <button onClick={() => setView('problemsSolved')}>Problems Solved</button> {/* New button */}
        </nav>
      </header>
      <main className='main_dev'>
        {view === 'profile' && <UserProfile />}
        {view === 'posts' && <UserPosts />}
        {view === 'submissions' && <Submissions />}
        {view === 'problemsSolved' && <ProblemsSolved />} {/* New condition */}
      </main>
    </div>
  );
};

export default ProfilePage;
