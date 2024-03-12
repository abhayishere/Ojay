// pages/problem/[problemId].tsx
'use client'
import { cpp } from '@codemirror/lang-cpp';
import { Editor } from '@monaco-editor/react';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useRouter } from 'next/router';
import React, { useEffect, useState,useRef } from 'react';
import './Problems.css'
import { useAuth } from '@/app/context/AuthContext';

interface ProblemDetails {
    id: string;
    difficulty: string;
    name: string;
    hint: string;
    problem_statement: string;
    examples: Example[];
    constraints: string[];
    time_complexities: string[];
    sample_test_cases: TestCases[];
  }
interface TestCases{
  id:string;
  input:string[];
  output:string[];
}
interface Example{
  id:string;
  example:string;
}

interface TestCaseResult{
  id:string;
  verdict:string;
}

interface VerdictReceived{
  verdict:string; 
  id:string;
  input:string[];
  output:string[];
}

export default function ProblemPage({params}:{
  params:{
    problemId: string;
}
}){
  const { problemId } = params;
  const [problem, setProblem] = useState<ProblemDetails | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState(''); 
  const [verdictReceived, setVerdictReceived] = useState<VerdictReceived[]>([]); 
  const [isChecking, setIsChecking] = useState(false); // State to track checking status
  const [checkResult, setCheckResult] = useState<TestCaseResult[]>([]); // State to store check results
  const editorRef = useRef(null);
  const { username } = useAuth();
  const runCode = async () => {
    setIsChecking(true); // Indicate that the code is being checked
    try {
      const response = await fetch('http://localhost:8080/run', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          problemId,
          username
        }),
        cache:'no-store'
      });
      const result = await response.json();
      setCheckResult(result.output); // Update the state with the result
      const mergedTestCases = problem?.sample_test_cases.map(tc => {
        let verdict = 'Not Executed'; // Default verdict
        for (const res of result.output) {
          if (res.id === tc.id) {
            verdict = res.verdict;
            break; // Stop searching once a match is found
          }
        }
        return { ...tc, verdict }; // Return the merged test case
      })||[];
      setVerdictReceived(mergedTestCases)
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setIsChecking(false); // Reset checking status regardless of outcome
    }
  };

  useEffect(() => {
    if (!params.problemId) return; // Guard against undefined problemId
    const fetchProblem = async () => {
      const response = await fetch(`http://localhost:8080/problems/${params.problemId}`,{cache:'no-store'});
      const data: ProblemDetails = await response.json();
      setProblem(data);
    };

    fetchProblem();
  }, [params.problemId]);

  if (!problem) return <div>Loading...</div>; // Handle loading state


  return (
    <div style={{margin:"0 4rem"}}>
      <h1>{problem.name}</h1>
      <p>Difficulty: {problem.difficulty}</p>
      <p>Description: {problem.problem_statement}</p>
      <h4>Examples:</h4>
      {problem.sample_test_cases.map((tc:TestCases) => (
          <div key={tc.id}>
            <p>Input {tc.id}:</p>
            <pre>{tc.input.join('\n')}</pre>
            <p>Output {tc.id}:</p>
            <pre>{tc.output.join('\n')}</pre>
          </div>
          ))}
      <h4>Constraints:</h4>
      <pre>{problem.constraints.map((constraint:string) => (
            <pre style={{fontSize:"0.8rem"}}>{constraint}</pre>
          ))}</pre>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="cpp">C++</option>
      </select>
      <div className="code-editor-container">
          <ReactCodeMirror
              value={code}
              theme={vscodeDark}
              ref={editorRef}
              onChange={(newValue) => setCode(newValue)}
              extensions={[cpp()]}
              style={{ minHeight: '50vh' }}
          >
          </ReactCodeMirror>
      </div>
      <button onClick={runCode} disabled={isChecking}>
        {isChecking ? 'Running...' : 'Run Code'}
      </button>
      <div>Result:</div>
      {checkResult.length > 0 && (
        <div>
          <h3>Test Cases Results</h3>
          <table>
            <thead>
              <tr>
                <th>Test Case ID</th>
                <th>Input</th>
                <th>Output</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              {verdictReceived.map((tc) => (
                <tr key={tc.id}>
                  <td>{tc.id}</td>
                  <td><pre>{tc.input.join('\n')}</pre></td>
                  <td><pre>{tc.output.join('\n')}</pre></td>
                  <td>{tc.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};