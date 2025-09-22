import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Code, Terminal, Copy, Check } from 'lucide-react';
import { Program } from '../types/Program';

interface ProgramRunnerProps {
  program: Program;
  onBack: () => void;
}

const ProgramRunner: React.FC<ProgramRunnerProps> = ({ program, onBack }) => {
  const [terminalContent, setTerminalContent] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [programState, setProgramState] = useState<any>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addToTerminal = (text: string, isInput: boolean = false) => {
    setTerminalContent(prev => [...prev, `${isInput ? '> ' : ''}${text}`]);
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalContent]);

  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput]);

  const handleRun = async () => {
    setIsRunning(true);
    setTerminalContent([]);
    setProgramState(null);
    
    try {
      await program.interactiveRunner(addToTerminal, setIsWaitingForInput, setProgramState);
    } catch (error) {
      addToTerminal(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsRunning(false);
      setIsWaitingForInput(false);
    }
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim() || !isWaitingForInput) return;

    addToTerminal(currentInput, true);
    const input = currentInput;
    setCurrentInput('');
    setIsWaitingForInput(false);

    try {
      await program.interactiveRunner(addToTerminal, setIsWaitingForInput, setProgramState, input);
    } catch (error) {
      addToTerminal(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      setIsRunning(false);
      setIsWaitingForInput(false);
    }
  };

  const handleReset = () => {
    setTerminalContent([]);
    setIsRunning(false);
    setIsWaitingForInput(false);
    setCurrentInput('');
    setProgramState(null);
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Interactive Terminal</span>
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={handleRun}
                disabled={isRunning || isWaitingForInput}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running...' : 'Start Program'}</span>
              </button>
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div
              ref={terminalRef}
              className="h-96 p-4 text-green-400 font-mono text-sm overflow-y-auto scrollbar-thin"
            >
              {terminalContent.length === 0 ? (
                <div className="text-gray-500">
                  Click "Start Program" to begin execution...
                </div>
              ) : (
                terminalContent.map((line, index) => (
                  <div key={index} className="mb-1 whitespace-pre-wrap">
                    {line}
                  </div>
                ))
              )}
              {isWaitingForInput && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">></span>
                  <form onSubmit={handleInputSubmit} className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-green-400 font-mono text-sm w-full"
                      placeholder="Enter your input..."
                      disabled={!isWaitingForInput}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
          
          {isWaitingForInput && (
            <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <strong>Waiting for input:</strong> Type your response and press Enter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramRunner;