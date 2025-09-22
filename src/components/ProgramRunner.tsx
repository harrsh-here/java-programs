import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Code, Terminal, Copy, Check } from 'lucide-react';
import { Program } from '../types/Program';

interface ProgramRunnerProps {
  program: Program;
  onBack: () => void;
}

const ProgramRunner: React.FC<ProgramRunnerProps> = ({ program, onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running program...\n');
    
    try {
      const result = await program.runner(input);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(program.sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Programs</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showCode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{showCode ? 'Hide Code' : 'View Code'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h1>
          <p className="text-gray-600 mb-4">{program.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {program.features.map((feature, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {showCode && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Source Code</h3>
              <button
                onClick={copyCode}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                {program.sourceCode}
              </pre>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Input</span>
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input here (one value per line)..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running...' : 'Run Program'}</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Output</span>
            </h3>
            <div
              ref={outputRef}
              className="w-full h-64 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-y-auto scrollbar-thin"
            >
              <pre className="whitespace-pre-wrap">
                {output || 'Output will appear here after running the program...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramRunner;