import React from 'react';
import styles from '../styles/PostStats.module.css'; // Adjust the path as needed

const PostStats = () => {
  // Dummy data
  const users = [
    { rank: 1, user: 'Benq', posts: 4 },
    { rank: 2, user: 'jiangly', posts: 3 },
    // Add more dummy data as needed
  ];

  return (
    <div className="ratingstats">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.user}</td>
              <td>{user.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostStats;
