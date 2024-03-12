'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/UserProfile.module.css'
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
interface Submissions{
  id:string,
  username:string,
  problemID:string,
  code:string,
  verdict:string,
  language:string,
}
const ProblemsSolved: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblemsSolved = async () => {
      // Fetch all submissions
      const submissionsRes = await fetch('http://localhost:3001/submissions');
      const submissions = await submissionsRes.json();
      
      // Filter submissions with a 'passed' verdict and get unique problem IDs
      const passedSubmissions = new Set(submissions
        .filter((submission:Submissions)  => submission.verdict === 'Correct Answer')
        .map((submission:Submissions) => submission.problemID));
      // Fetch and display each unique problem
      const problemsPromises = Array.from(passedSubmissions).map(async (id) => {
        const problemRes = await fetch(`http://localhost:3001/problems/${id}`);
        return problemRes.json();
      });
      const problemsSolved = await Promise.all(problemsPromises);
      setProblems(problemsSolved);
    };

    fetchProblemsSolved();
  }, []);

  return (
    <div>
      <h2>Problems Solved</h2>
      <table>
        <thead>
          <tr>
            <th>Problem ID</th>
            <th>Name</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem:Problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.name}</td>
              <td>{problem.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsSolved;
