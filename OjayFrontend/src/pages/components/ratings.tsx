import React from 'react';
import styles from '../styles/Ratings.module.css'; // Adjust the path as needed

const TopRated = () => {
  // Dummy data
  const users = [
    { rank: 1, user: 'Benq', rating: 3601 },
    { rank: 2, user: 'jiangly', rating: 3598 },
    // Add more dummy data as needed
  ];

  return (
    <div className="ratingstats">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.user}</td>
              <td>{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopRated;
