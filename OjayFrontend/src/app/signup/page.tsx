'use client'
import React, { useState } from 'react';
import './signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className='boddy'>
        <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <button type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    </div>
    
  );
};

export default Signup;