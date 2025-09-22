export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
  sourceCode: string;
  runner: (input: string) => Promise<string>;
  interactiveRunner: (
    addToTerminal: (text: string, isInput?: boolean) => void,
    setWaitingForInput: (waiting: boolean) => void,
    setProgramState: (state: any) => void,
    userInput?: string
  ) => Promise<void>;
}