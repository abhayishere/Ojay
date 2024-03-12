// pages/login.js

"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'
import { useAuth } from '../../app/context/AuthContext';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.status==200) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            let string = JSON.stringify(user.problemIdsSolved)
            localStorage.setItem("problemIdSolved", string)
            localStorage.setItem('username', user.username);
            localStorage.setItem('role', user.role);
            localStorage.setItem('username', user.problemIdsSolved);
            localStorage.setItem('username', user.postIds);
            login(user.username);
            router.push('/');
        } else {
            alert("Login failed!");
        }
    }

    return (
        <div className='boddy'>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    </div>
                    <div className="input-group">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <a href="/register" className="link">Don't have an account? Sign up</a>
            </div>
        </div>
        
    );
}
