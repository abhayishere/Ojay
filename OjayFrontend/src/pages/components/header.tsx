'use client'

import { useState } from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useAuth } from '../../app/context/AuthContext';

const Header: React.FC = () => {
  // Use localStorage for state persistence
  const { isLoggedIn, username, logout } = useAuth();
  
  return (
    <div className={styles.header}>
      <div className={styles.containerLeft}>
        <h1 style={{ fontSize: '1.5rem' }}>Ojay</h1>
      </div>
      <div>
        <div className={styles.containerRight}>
          {isLoggedIn ? (
             <>
             <Link href={`/${username}`} passHref>
               <button className={styles.buttonStyle}>{username}</button>
             </Link>
             <button className={styles.buttonStyle} onClick={logout}>Logout</button>
           </>
          ) : (
            <Link href="/login" passHref>
              <button className={styles.buttonStyle}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>

  );
};

export default Header;
