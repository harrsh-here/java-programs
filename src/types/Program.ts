export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
  sourceCode: string;
  runner: (input: string) => Promise<string>;
}