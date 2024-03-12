'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/PostStats.module.css'; // Adjust the path as needed
import { useAuth } from '@/app/context/AuthContext';

interface Submissions{
  id:string,
  username:string,
  problemID:string,
  code:string,
  verdict:string[],
  language:string,
}


const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const { username } = useAuth();
  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch(`http://localhost:8080/submissions/${username}`, { cache: 'no-store' });
      const data = await res.json();
      setSubmissions(data);
    };

    if (username) {
      fetchSubmissions();
    }
  }, [username]);

  return (
    <div>
      <h2>Submissions for {username}</h2>
      {submissions.length ? (
        <table>
          <thead>
            <tr>
              <th>Problem ID</th>
              <th>Verdict</th>
              <th>Language</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission:Submissions) => (
              <tr key={submission.id}>
                <td>{submission.problemID}</td>
                <td>{submission.verdict}</td>
                <td>{submission.language}</td>
                {/* Add more table columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default Submissions;
