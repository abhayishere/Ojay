'use client'

import React from 'react';
import styles from '../styles/userProfileStats.module.css';
import { useAuth } from '../../app/context/AuthContext';

const UserProfileStats: React.FC = () => {
  const { isLoggedIn, username } = useAuth();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="userinfo">
      <div className={styles.user}>
        <span>{username}</span>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <a href={`/${username}`}></a>
          </li>
          <li>
            <a href="#">Posts</a>
          </li>
          <li>
            <a href="#">Submissions</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileStats;
