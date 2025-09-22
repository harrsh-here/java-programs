import React, { useState } from 'react';
import { Code, Play, Terminal, FileText } from 'lucide-react';
import ProgramCard from './components/ProgramCard';
import ProgramRunner from './components/ProgramRunner';
import { programs } from './data/programs';
import { Program } from './types/Program';

function App() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Java Programs Showcase</h1>
              <p className="text-gray-600">Interactive demonstrations of Java programming concepts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedProgram ? (
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Programs</h2>
              <p className="text-gray-600">Click on any program to run it interactively</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  onSelect={setSelectedProgram}
                />
              ))}
            </div>
          </div>
        ) : (
          <ProgramRunner
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
          />
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Terminal className="w-4 h-4" />
            <span>Created by @harrsh-here</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;