'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/UserProfile.module.css'
import { useAuth } from '@/app/context/AuthContext';
interface Problem {
  id: string;
  difficulty: string;
  name: string;
  hint: string;
  problem_statement: string;
  examples: string[];
  constraints: string[];
  time_complexities: string[];
  solved: number;
}
const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [view, setView] = useState('profile');
  const [problemsSolved,setProblemsSolved]=useState<any>();
  const router = useRouter();
  const {isLoggedIn, username } = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const storedUser = localStorage.getItem('user'); 
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const problemsDetails = await Promise.all(
            user.problemIdsSolved.map(async (problemId: string) => {
              const response = await fetch(`http://localhost:8080/${username}`);
              if (!response.ok) {
                throw new Error('Problem fetching failed');
              }
              return response.json();
            })
          );
          setProblemsSolved(problemsDetails);
          setUserData(user);
        } else {
          setError({ message: 'User not logged in' });
          router.push('/')
        }
      }catch (error) {
        setError({ message: 'User not logged in' });
      }finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run effect only on component mount

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={styles.userProfile}>
      <h1 className={styles.title}>{userData.username}</h1>
      <p className={styles.pp}>Role: {userData.role}</p>
      <p className={styles.pp}>Joining Date: {userData.joinedDate}</p>
    </div>
  );
};

export default UserProfile;
