import React from 'react';
import { Play, Code2, Star } from 'lucide-react';
import { Program } from '../types/Program';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">{program.category}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
            {program.difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-1">
            {program.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                {feature}
              </span>
            ))}
            {program.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{program.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onSelect(program)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Run Program</span>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;