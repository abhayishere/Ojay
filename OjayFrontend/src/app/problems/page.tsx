'use client'

import { useEffect, useState } from 'react';
import './problems.css'; // Assuming this is the correct path
import Link from 'next/link';

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

export default function Problems() {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    async function fetchProblems() {
      const res = await fetch("http://localhost:8080/problems", { cache: 'no-store' });
      const data = await res.json();
      setProblems(data);
    }

    fetchProblems();
  }, []);

  return (
    <div className="problems-container">
      <h1>Problems List</h1>
      <table>
        <thead>
          <tr>
            <th>Problem ID</th>
            <th>Problem Name</th>
            <th>Difficulty</th>
            <th>Number of People Solved</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td className="name">
                <Link href={`/problems/${problem.id}`}>
                  {problem.name}
                </Link>
              </td>
              <td>{problem.difficulty}</td>
              <td>{problem.solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
