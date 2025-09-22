import { Program } from '../types/Program';

// Utility function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const programs: Program[] = [
  {
    id: 'bank-account',
    title: 'Bank Account Management System',
    description: 'A comprehensive banking system with account creation, deposits, withdrawals, and balance checking.',
    category: 'Object-Oriented Programming',
    difficulty: 'Intermediate',
    features: ['Account Creation', 'PIN Verification', 'Balance Management', 'Transaction History', 'Input Validation'],
    sourceCode: `import java.util.Scanner;

public class BankAccount {
    static Scanner sc = new Scanner(System.in);
    static char currency = '₹';

    public static void main(String[] args) throws InterruptedException {
        double balanceOld = 0, withdraw = 0, deposit = 0;
        String name;
        int age, pin = 0000;
        String phoneNo;
        boolean match;

        while(true) {
            Thread.sleep(400);
            System.out.println("--- Welcome to XYZ Bank ---");
            Thread.sleep(900);
            System.out.println("Create a Bank Account here ...");
            Thread.sleep(2000);
            System.out.print("Enter Age : ");

            age = sc.nextInt();

            if (age <= 18 || age > 110) {
                System.out.println("!!!You can't create account, you have to be above 18 and below 110 to create an account..");
                continue;
            } else {
                try {
                    System.out.print("Enter Name : ");
                    sc.nextLine();
                    name = sc.nextLine();
                    System.out.print("Enter Phone Number : ");
                    phoneNo = sc.nextLine();
                    if(phoneNo.length()!=10) {
                        System.out.println("!!!Please enter the phone number with 10 digits..");
                        continue;
                    }
                    else{
                        System.out.print("Enter a 4 digit pin to setup the account : ");
                        pin = sc.nextInt();

                        if(String.valueOf(Math.abs(pin)).length()!=4) {
                            System.out.println("!!Please enter a valid 4 digit pin..");
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                } catch (Exception e) {
                    System.out.println("!!Got an error, please try again!");
                    continue;
                }
            }
        }
        
        System.out.println("Welcome, " + name + "! what operations would you like to perform.. ");
        
        while (true) {
            System.out.println("\\n");
            System.out.println("Choose Operations : \\n1. Check Balance\\n2. Deposit Amount\\n3. Withdraw Amount\\n4.View Account Details\\n5. exit..!");

            int operation = sc.nextInt();

            if(operation==5){
                System.out.println("Exiting...!");
                break;
            }

            match = verifyPin(pin);
            Thread.sleep(200);

            if(match) {
                switch (operation) {
                    case 1 -> {
                        System.out.println("Your Current balance is \\n" + currency + calculateBalance(balanceOld, withdraw, deposit));
                        balanceOld = calculateBalance(balanceOld, withdraw, deposit);
                        Thread.sleep(3000);
                    }
                    case 2 -> {
                        balanceOld = handleDeposit(balanceOld);
                        Thread.sleep(3000);
                    }
                    case 3 -> {
                        balanceOld = handleWithdraw(balanceOld);
                        Thread.sleep(3000);
                    }
                    case 4 -> {
                        Thread.sleep(1000);
                        System.out.println("--- Account Holder Details ---");
                        System.out.println("Name : " + name);
                        System.out.println("Age : " + age);
                        System.out.println("Phone no. : +91" + phoneNo);
                        Thread.sleep(3000);
                    }
                    default -> {
                        System.out.println("!!!Please Enter a valid choice..");
                        Thread.sleep(3000);
                        continue;
                    }
                }
            }
            else {
                continue;
            }
            System.out.println("\\n");
        }
    }
}`,
    runner: async (input: string): Promise<string> => {
      // Keep the old runner for backward compatibility
      const lines = input.trim().split('\n').filter(line => line.trim());
      let output = '';
      let lineIndex = 0;
      let balance = 0;
      let name = '';
      let age = 0;
      let phoneNo = '';
      let pin = 0;
      let accountCreated = false;

      const getNextInput = () => {
        if (lineIndex < lines.length) {
          return lines[lineIndex++].trim();
        }
        return '';
      };

      output += "--- Welcome to XYZ Bank ---\n";
      await delay(100);
      output += "Create a Bank Account here ...\n";
      await delay(100);

      // Account creation process
      while (!accountCreated) {
        output += "Enter Age : ";
        const ageInput = getNextInput();
        if (!ageInput) {
          output += "\nPlease provide age in input\n";
          break;
        }
        
        age = parseInt(ageInput);
        output += ageInput + "\n";

        if (age <= 18 || age > 110) {
          output += "!!!You can't create account, you have to be above 18 and below 110 to create an account..\n";
          continue;
        }

        output += "Enter Name : ";
        name = getNextInput();
        if (!name) {
          output += "\nPlease provide name in input\n";
          break;
        }
        output += name + "\n";

        output += "Enter Phone Number : ";
        phoneNo = getNextInput();
        if (!phoneNo) {
          output += "\nPlease provide phone number in input\n";
          break;
        }
        output += phoneNo + "\n";

        if (phoneNo.length !== 10) {
          output += "!!!Please enter the phone number with 10 digits..\n";
          continue;
        }

        output += "Enter a 4 digit pin to setup the account : ";
        const pinInput = getNextInput();
        if (!pinInput) {
          output += "\nPlease provide PIN in input\n";
          break;
        }
        
        pin = parseInt(pinInput);
        output += pinInput + "\n";

        if (Math.abs(pin).toString().length !== 4) {
          output += "!!Please enter a valid 4 digit pin..\n";
          continue;
        }

        accountCreated = true;
        output += `Welcome, ${name}! what operations would you like to perform..\n\n`;
      }

      if (!accountCreated) return output;

      // Main banking operations
      while (lineIndex < lines.length) {
        output += "Choose Operations :\n1. Check Balance\n2. Deposit Amount\n3. Withdraw Amount\n4. View Account Details\n5. exit..!\n";
        
        const operationInput = getNextInput();
        if (!operationInput) break;
        
        const operation = parseInt(operationInput);
        output += operationInput + "\n";

        if (operation === 5) {
          output += "Exiting...!\n";
          break;
        }

        // PIN verification
        output += "!!! Enter PIN to Perform the Operation !!!\n";
        const enteredPin = getNextInput();
        if (!enteredPin) {
          output += "Please provide PIN in input\n";
          break;
        }
        output += enteredPin + "\n";

        const pinNum = parseInt(enteredPin);
        if (Math.abs(pinNum).toString().length !== 4) {
          output += "!!!Enter a 4 digit PIN, OPERATION FAILED!\n";
          continue;
        }

        if (pinNum !== pin) {
          output += "Wrong PIN, Try again\n";
          continue;
        }

        output += "Please wait, processing ...\n";

        switch (operation) {
          case 1:
            output += `Your Current balance is\n₹${balance}\n`;
            break;
          case 2:
            output += "Enter the amount you want to deposit!\n";
            const depositInput = getNextInput();
            if (!depositInput) {
              output += "Please provide deposit amount in input\n";
              return output;
            }
            const depositAmount = parseFloat(depositInput);
            output += depositInput + "\n";
            balance += depositAmount;
            output += `--- Amount ₹${depositAmount} deposit successful! ---\n`;
            break;
          case 3:
            output += "Enter the amount you want to withdraw!\n";
            const withdrawInput = getNextInput();
            if (!withdrawInput) {
              output += "Please provide withdrawal amount in input\n";
              return output;
            }
            const withdrawAmount = parseFloat(withdrawInput);
            output += withdrawInput + "\n";
            
            if (withdrawAmount > balance) {
              output += "!!!You don't have enough balance to complete this transaction\n";
            } else if (withdrawAmount % 100 !== 0) {
              output += "Please enter the value in multiple of 100 !!\n";
            } else if (withdrawAmount <= 0) {
              output += "Please enter a valid amount\n";
            } else {
              balance -= withdrawAmount;
              output += `--- Amount ₹${withdrawAmount} withdraw successful! ---\n`;
            }
            break;
          case 4:
            output += "--- Account Holder Details ---\n";
            output += `Name : ${name}\n`;
            output += `Age : ${age}\n`;
            output += `Phone no. : +91${phoneNo}\n`;
            break;
          default:
            output += "!!!Please Enter a valid choice..\n";
            continue;
        }
        output += "\n";
      }

      return output;
    },
    interactiveRunner: async (addToTerminal, setWaitingForInput, setProgramState, userInput) => {
      if (!userInput) {
        // Initialize program
        await delay(400);
        addToTerminal("--- Welcome to XYZ Bank ---");
        await delay(900);
        addToTerminal("Create a Bank Account here ...");
        await delay(500);
        addToTerminal("Enter Age : ");
        setProgramState({ step: 'age' });
        setWaitingForInput(true);
        return;
      }

      const state = setProgramState as any;
      const currentState = state.current || { step: 'age', balance: 0 };

      switch (currentState.step) {
        case 'age':
          const age = parseInt(userInput);
          if (age <= 18 || age > 110) {
            addToTerminal("!!!You can't create account, you have to be above 18 and below 110 to create an account..");
            await delay(500);
            addToTerminal("Enter Age : ");
            setWaitingForInput(true);
            return;
          }
          currentState.age = age;
          currentState.step = 'name';
          addToTerminal("Enter Name : ");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'name':
          currentState.name = userInput;
          currentState.step = 'phone';
          addToTerminal("Enter Phone Number : ");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'phone':
          if (userInput.length !== 10) {
            addToTerminal("!!!Please enter the phone number with 10 digits..");
            await delay(500);
            addToTerminal("Enter Phone Number : ");
            setWaitingForInput(true);
            return;
          }
          currentState.phoneNo = userInput;
          currentState.step = 'pin';
          addToTerminal("Enter a 4 digit pin to setup the account : ");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'pin':
          const pin = parseInt(userInput);
          if (Math.abs(pin).toString().length !== 4) {
            addToTerminal("!!Please enter a valid 4 digit pin..");
            await delay(500);
            addToTerminal("Enter a 4 digit pin to setup the account : ");
            setWaitingForInput(true);
            return;
          }
          currentState.pin = pin;
          currentState.step = 'menu';
          addToTerminal(`Welcome, ${currentState.name}! what operations would you like to perform..`);
          await delay(500);
          addToTerminal("\nChoose Operations :");
          addToTerminal("1. Check Balance");
          addToTerminal("2. Deposit Amount");
          addToTerminal("3. Withdraw Amount");
          addToTerminal("4. View Account Details");
          addToTerminal("5. exit..!");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'menu':
          const operation = parseInt(userInput);
          if (operation === 5) {
            addToTerminal("Exiting...!");
            setWaitingForInput(false);
            return;
          }
          if (operation < 1 || operation > 5) {
            addToTerminal("!!!Please Enter a valid choice..");
            await delay(500);
            addToTerminal("\nChoose Operations :");
            addToTerminal("1. Check Balance");
            addToTerminal("2. Deposit Amount");
            addToTerminal("3. Withdraw Amount");
            addToTerminal("4. View Account Details");
            addToTerminal("5. exit..!");
            setWaitingForInput(true);
            return;
          }
          currentState.operation = operation;
          currentState.step = 'pin_verify';
          addToTerminal("!!! Enter PIN to Perform the Operation !!!");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'pin_verify':
          const enteredPin = parseInt(userInput);
          if (Math.abs(enteredPin).toString().length !== 4) {
            addToTerminal("!!!Enter a 4 digit PIN, OPERATION FAILED!");
            await delay(500);
            addToTerminal("\nChoose Operations :");
            addToTerminal("1. Check Balance");
            addToTerminal("2. Deposit Amount");
            addToTerminal("3. Withdraw Amount");
            addToTerminal("4. View Account Details");
            addToTerminal("5. exit..!");
            currentState.step = 'menu';
            setProgramState(currentState);
            setWaitingForInput(true);
            return;
          }
          if (enteredPin !== currentState.pin) {
            addToTerminal("Wrong PIN, Try again");
            await delay(500);
            addToTerminal("\nChoose Operations :");
            addToTerminal("1. Check Balance");
            addToTerminal("2. Deposit Amount");
            addToTerminal("3. Withdraw Amount");
            addToTerminal("4. View Account Details");
            addToTerminal("5. exit..!");
            currentState.step = 'menu';
            setProgramState(currentState);
            setWaitingForInput(true);
            return;
          }
          
          addToTerminal("Please wait, processing ...");
          await delay(500);
          
          switch (currentState.operation) {
            case 1:
              addToTerminal(`Your Current balance is\n₹${currentState.balance || 0}`);
              break;
            case 2:
              currentState.step = 'deposit';
              addToTerminal("Enter the amount you want to deposit!");
              setProgramState(currentState);
              setWaitingForInput(true);
              return;
            case 3:
              currentState.step = 'withdraw';
              addToTerminal("Enter the amount you want to withdraw!");
              setProgramState(currentState);
              setWaitingForInput(true);
              return;
            case 4:
              addToTerminal("--- Account Holder Details ---");
              addToTerminal(`Name : ${currentState.name}`);
              addToTerminal(`Age : ${currentState.age}`);
              addToTerminal(`Phone no. : +91${currentState.phoneNo}`);
              break;
          }
          
          await delay(1000);
          addToTerminal("\nChoose Operations :");
          addToTerminal("1. Check Balance");
          addToTerminal("2. Deposit Amount");
          addToTerminal("3. Withdraw Amount");
          addToTerminal("4. View Account Details");
          addToTerminal("5. exit..!");
          currentState.step = 'menu';
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'deposit':
          const depositAmount = parseFloat(userInput);
          if (isNaN(depositAmount) || depositAmount <= 0) {
            addToTerminal("Please enter a valid amount");
          } else {
            currentState.balance = (currentState.balance || 0) + depositAmount;
            addToTerminal(`--- Amount ₹${depositAmount} deposit successful! ---`);
          }
          await delay(1000);
          addToTerminal("\nChoose Operations :");
          addToTerminal("1. Check Balance");
          addToTerminal("2. Deposit Amount");
          addToTerminal("3. Withdraw Amount");
          addToTerminal("4. View Account Details");
          addToTerminal("5. exit..!");
          currentState.step = 'menu';
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'withdraw':
          const withdrawAmount = parseFloat(userInput);
          if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            addToTerminal("Please enter a valid amount");
          } else if (withdrawAmount > (currentState.balance || 0)) {
            addToTerminal("!!!You don't have enough balance to complete this transaction");
          } else if (withdrawAmount % 100 !== 0) {
            addToTerminal("Please enter the value in multiple of 100 !!");
          } else {
            currentState.balance = (currentState.balance || 0) - withdrawAmount;
            addToTerminal(`--- Amount ₹${withdrawAmount} withdraw successful! ---`);
          }
          await delay(1000);
          addToTerminal("\nChoose Operations :");
          addToTerminal("1. Check Balance");
          addToTerminal("2. Deposit Amount");
          addToTerminal("3. Withdraw Amount");
          addToTerminal("4. View Account Details");
          addToTerminal("5. exit..!");
          currentState.step = 'menu';
          setProgramState(currentState);
          setWaitingForInput(true);
          break;
      }
    }
  },
  {
    id: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert temperatures between Celsius and Fahrenheit with input validation and error handling.',
    category: 'Basic Programming',
    difficulty: 'Beginner',
    features: ['Celsius to Fahrenheit', 'Fahrenheit to Celsius', 'Input Validation', 'Error Handling', 'Loop Control'],
    sourceCode: `import java.util.Scanner;

public class TemperatureConverter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\\nEnter Choice:");
            System.out.println("1. C -> F\\n2. F -> C");
            System.out.println("Press 0 to exit");

            byte choice;

            try {
                choice = sc.nextByte();
            } catch (Exception e) {
                System.out.println("Invalid input! Please enter a number.");
                sc.nextLine();
                continue;
            }

            if (choice == 0) {
                System.out.println("Exiting...");
                break;
            }

            if (choice != 1 && choice != 2) {
                System.out.println("Enter a valid choice (1 or 2)");
                continue;
            }

            System.out.print("Enter Temperature: ");
            double temperature;

            try {
                temperature = sc.nextDouble();
            } catch (Exception e) {
                System.out.println("Invalid temperature input!");
                sc.nextLine();
                continue;
            }

            double newTemp;
            if (choice == 1) {
                newTemp = (temperature * 9.0 / 5.0) + 32;
                System.out.println(temperature + "°C is " + newTemp + "°F");
            } else {
                newTemp = (temperature - 32) * 5.0 / 9.0;
                System.out.println(temperature + "°F is " + newTemp + "°C");
            }
        }

        sc.close();
    }
}`,
    runner: async (input: string): Promise<string> => {
      const lines = input.trim().split('\n').filter(line => line.trim());
      let output = '';
      let lineIndex = 0;

      const getNextInput = () => {
        if (lineIndex < lines.length) {
          return lines[lineIndex++].trim();
        }
        return '';
      };

      while (lineIndex < lines.length) {
        output += "\nEnter Choice:\n";
        output += "1. C -> F\n2. F -> C\n";
        output += "Press 0 to exit\n";

        const choiceInput = getNextInput();
        if (!choiceInput) break;
        
        output += choiceInput + "\n";
        const choice = parseInt(choiceInput);

        if (isNaN(choice)) {
          output += "Invalid input! Please enter a number.\n";
          continue;
        }

        if (choice === 0) {
          output += "Exiting...\n";
          break;
        }

        if (choice !== 1 && choice !== 2) {
          output += "Enter a valid choice (1 or 2)\n";
          continue;
        }

        output += "Enter Temperature: ";
        const tempInput = getNextInput();
        if (!tempInput) {
          output += "\nPlease provide temperature in input\n";
          break;
        }
        
        output += tempInput + "\n";
        const temperature = parseFloat(tempInput);

        if (isNaN(temperature)) {
          output += "Invalid temperature input!\n";
          continue;
        }

        let newTemp;
        if (choice === 1) {
          newTemp = (temperature * 9.0 / 5.0) + 32;
          output += `${temperature}°C is ${newTemp.toFixed(2)}°F\n`;
        } else {
          newTemp = (temperature - 32) * 5.0 / 9.0;
          output += `${temperature}°F is ${newTemp.toFixed(2)}°C\n`;
        }
      }

      return output;
    },
    interactiveRunner: async (addToTerminal, setWaitingForInput, setProgramState, userInput) => {
      if (!userInput) {
        // Initialize program
        addToTerminal("\nEnter Choice:");
        addToTerminal("1. C -> F");
        addToTerminal("2. F -> C");
        addToTerminal("Press 0 to exit");
        setProgramState({ step: 'choice' });
        setWaitingForInput(true);
        return;
      }

      const state = setProgramState as any;
      const currentState = state.current || { step: 'choice' };

      switch (currentState.step) {
        case 'choice':
          const choice = parseInt(userInput);
          if (isNaN(choice)) {
            addToTerminal("Invalid input! Please enter a number.");
            await delay(500);
            addToTerminal("\nEnter Choice:");
            addToTerminal("1. C -> F");
            addToTerminal("2. F -> C");
            addToTerminal("Press 0 to exit");
            setWaitingForInput(true);
            return;
          }

          if (choice === 0) {
            addToTerminal("Exiting...");
            setWaitingForInput(false);
            return;
          }

          if (choice !== 1 && choice !== 2) {
            addToTerminal("Enter a valid choice (1 or 2)");
            await delay(500);
            addToTerminal("\nEnter Choice:");
            addToTerminal("1. C -> F");
            addToTerminal("2. F -> C");
            addToTerminal("Press 0 to exit");
            setWaitingForInput(true);
            return;
          }

          currentState.choice = choice;
          currentState.step = 'temperature';
          addToTerminal("Enter Temperature: ");
          setProgramState(currentState);
          setWaitingForInput(true);
          break;

        case 'temperature':
          const temperature = parseFloat(userInput);
          if (isNaN(temperature)) {
            addToTerminal("Invalid temperature input!");
            await delay(500);
            addToTerminal("Enter Temperature: ");
            setWaitingForInput(true);
            return;
          }

          let newTemp;
          if (currentState.choice === 1) {
            newTemp = (temperature * 9.0 / 5.0) + 32;
            addToTerminal(`${temperature}°C is ${newTemp.toFixed(2)}°F`);
          } else {
            newTemp = (temperature - 32) * 5.0 / 9.0;
            addToTerminal(`${temperature}°F is ${newTemp.toFixed(2)}°C`);
          }

          await delay(1000);
          addToTerminal("\nEnter Choice:");
          addToTerminal("1. C -> F");
          addToTerminal("2. F -> C");
          addToTerminal("Press 0 to exit");
          currentState.step = 'choice';
          setProgramState(currentState);
          setWaitingForInput(true);
          break;
      }
    }
  },
  {
    id: 'keyword-identifier',
    title: 'Java Keyword Identifier',
    description: 'Identify Java keywords from input text and categorize tokens as keywords or identifiers.',
    category: 'Language Processing',
    difficulty: 'Intermediate',
    features: ['Keyword Recognition', 'Token Parsing', 'Text Analysis', 'Array Processing', 'String Manipulation'],
    sourceCode: `import java.util.ArrayList;
import java.util.Scanner;
import java.util.Arrays;

public class java_keyword_identifier {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int columns = 3;
        String[] keywords = {
                "abstract", "assert", "boolean", "break", "byte",
                "case", "catch", "char", "class", "const",
                "continue", "default", "do", "double", "else",
                "enum", "extends", "final", "finally", "float",
                "for", "goto", "if", "implements", "import",
                "instanceof", "int", "interface", "long", "native",
                "new", "package", "private", "protected", "public",
                "return", "short", "static", "strictfp", "super",
                "switch", "synchronized", "this", "throw", "throws",
                "transient", "try", "void", "volatile", "while"
        };
        
        while (true) {
            System.out.print("Enter The input String (Enter 1 to Exit) : ");
            String toCheck = sc.nextLine();

            if (toCheck.equals("1")) {
                System.out.println("Exiting..!");
                break;
            }

            ArrayList<String> matched = new ArrayList<>();
            ArrayList<String> unMatched = new ArrayList<>();
            String[] tokens = toCheck.split("\\\\W+");

            for (String token : tokens) {
                if (Arrays.asList(keywords).contains(token)) {
                    matched.add(token);
                } else {
                    unMatched.add(token);
                }
            }

            System.out.println("\\n\\n");
            System.out.println("Tokens : ");

            for (int i = 0; i < (tokens.length); i++) {
                System.out.print(tokens[i]);
                if (i % columns == 0) {
                    System.out.println(",");
                } else {
                    System.out.print(",");
                }
            }
            
            System.out.println("\\n\\n");
            System.out.println("Matched Keywords :");
            for (String mToken : matched) {
                System.out.println(mToken);
            }
            
            System.out.println();
            System.out.println("Non-Matched Keywords :");
            for (String umToken : unMatched) {
                System.out.println(umToken);
            }
        }
    }
}`,
    runner: async (input: string): Promise<string> => {
      const lines = input.trim().split('\n').filter(line => line.trim());
      let output = '';
      let lineIndex = 0;

      const keywords = [
        "abstract", "assert", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extends", "final", "finally", "float",
        "for", "goto", "if", "implements", "import",
        "instanceof", "int", "interface", "long", "native",
        "new", "package", "private", "protected", "public",
        "return", "short", "static", "strictfp", "super",
        "switch", "synchronized", "this", "throw", "throws",
        "transient", "try", "void", "volatile", "while"
      ];

      const getNextInput = () => {
        if (lineIndex < lines.length) {
          return lines[lineIndex++].trim();
        }
        return '';
      };

      while (lineIndex < lines.length) {
        output += "Enter The input String (Enter 1 to Exit) : ";
        const inputString = getNextInput();
        if (!inputString) break;
        
        output += inputString + "\n";

        if (inputString === "1") {
          output += "Exiting..!\n";
          break;
        }

        const matched: string[] = [];
        const unMatched: string[] = [];
        const tokens = inputString.split(/\W+/).filter(token => token.length > 0);

        for (const token of tokens) {
          if (keywords.includes(token)) {
            matched.push(token);
          } else {
            unMatched.push(token);
          }
        }

        output += "\n\nTokens :\n";
        for (let i = 0; i < tokens.length; i++) {
          output += tokens[i];
          if (i < tokens.length - 1) {
            output += ",";
          }
          if ((i + 1) % 3 === 0) {
            output += "\n";
          }
        }

        output += "\n\nMatched Keywords :\n";
        for (const mToken of matched) {
          output += mToken + "\n";
        }

        output += "\nNon-Matched Keywords :\n";
        for (const umToken of unMatched) {
          output += umToken + "\n";
        }
        output += "\n";
      }

      return output;
    },
    interactiveRunner: async (addToTerminal, setWaitingForInput, setProgramState, userInput) => {
      const keywords = [
        "abstract", "assert", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extends", "final", "finally", "float",
        "for", "goto", "if", "implements", "import",
        "instanceof", "int", "interface", "long", "native",
        "new", "package", "private", "protected", "public",
        "return", "short", "static", "strictfp", "super",
        "switch", "synchronized", "this", "throw", "throws",
        "transient", "try", "void", "volatile", "while"
      ];

      if (!userInput) {
        // Initialize program
        addToTerminal("Enter The input String (Enter 1 to Exit) : ");
        setProgramState({ step: 'input' });
        setWaitingForInput(true);
        return;
      }

      if (userInput === "1") {
        addToTerminal("Exiting..!");
        setWaitingForInput(false);
        return;
      }

      const matched: string[] = [];
      const unMatched: string[] = [];
      const tokens = userInput.split(/\W+/).filter(token => token.length > 0);

      for (const token of tokens) {
        if (keywords.includes(token)) {
          matched.push(token);
        } else {
          unMatched.push(token);
        }
      }

      addToTerminal("\n\nTokens :");
      let tokenLine = "";
      for (let i = 0; i < tokens.length; i++) {
        tokenLine += tokens[i];
        if (i < tokens.length - 1) {
          tokenLine += ",";
        }
        if ((i + 1) % 3 === 0 || i === tokens.length - 1) {
          addToTerminal(tokenLine);
          tokenLine = "";
        }
      }

      addToTerminal("\n\nMatched Keywords :");
      for (const mToken of matched) {
        addToTerminal(mToken);
      }

      addToTerminal("\nNon-Matched Keywords :");
      for (const umToken of unMatched) {
        addToTerminal(umToken);
      }

      await delay(1000);
      addToTerminal("\nEnter The input String (Enter 1 to Exit) : ");
      setWaitingForInput(true);
    }
  },
  {
    id: 'operator-identifier',
    title: 'Java Operator & Keyword Identifier',
    description: 'Advanced text analyzer that identifies both Java operators and keywords from input text.',
    category: 'Language Processing',
    difficulty: 'Advanced',
    features: ['Operator Recognition', 'Keyword Detection', 'Advanced Parsing', 'Multiple Token Types', 'Comprehensive Analysis'],
    sourceCode: `import java.util.ArrayList;
import java.util.Scanner;
import java.util.Arrays;

public class operator_identifier_java {
    public static void main(String[] args){
       Scanner sc = new Scanner(System.in);
       int columns=3;
       String toCheck;

       String[] operators = {"+", "-", "*", "/", "%", "++", "--", "==", "!=", ">", "<", ">=", "<=",
               "&&", "||", "!", "&", "|", "^", "~",
               "<<", ">>", ">>>", "=", "+=", "-=", "*=",
               "/=", "%=", "&=", "|=", "^=", "<<=", ">>=", ">>>=", "instanceof", "?:"
       };

        String[] keywords = {
                "abstract", "assert", "boolean", "break", "byte",
                "case", "catch", "char", "class", "const",
                "continue", "default", "do", "double", "else",
                "enum", "extends", "final", "finally", "float",
                "for", "goto", "if", "implements", "import",
                "instanceof", "int", "interface", "long", "native",
                "new", "package", "private", "protected", "public",
                "return", "short", "static", "strictfp", "super",
                "switch", "synchronized", "this", "throw", "throws",
                "transient", "try", "void", "volatile", "while"
        };

        while(true) {
            System.out.println("Enter the Sentence (Enter 1 to exit) : ");
            toCheck = sc.nextLine();

            if(toCheck.equals("1")) {
                System.out.println("Exiting..");
                break;
            }

            ArrayList<String> matched = new ArrayList<>();
            ArrayList<String> unMatched = new ArrayList<>();
            ArrayList<String> opMatched = new ArrayList<>();
            String[] tokens = toCheck.split("\\\\W+");
            String[] opTokens = toCheck.split("\\\\s+");

            for (String token : tokens) {
                if (Arrays.asList(keywords).contains(token)) {
                    matched.add(token);
                } else {
                    unMatched.add(token);
                }
            }

            for (String token : opTokens) {
                if (Arrays.asList(operators).contains(token)) {
                    opMatched.add(token);
                }
            }

            System.out.println("\\n\\n");
            System.out.println("Tokens : ");

            for (int i = 0; i < (tokens.length); i++) {
                System.out.print(tokens[i]);
                if (i % columns == 0) {
                    System.out.println(",");
                } else {
                    System.out.print(",");
                }
            }
            
            System.out.println();
            System.out.println("Matched Keywords :");
            for (String mToken : matched) {
                System.out.println(mToken);
            }

            System.out.println();
            System.out.println("Matched Operators : ");
            for(String opToken : opMatched ) {
                System.out.println(opToken);
            }

            System.out.println();
            System.out.println("Non-Matched Keywords :");
            for (String umToken : unMatched) {
                System.out.println(umToken);
            }
        }
    }
}`,
    runner: async (input: string): Promise<string> => {
      const lines = input.trim().split('\n').filter(line => line.trim());
      let output = '';
      let lineIndex = 0;

      const operators = ["+", "-", "*", "/", "%", "++", "--", "==", "!=", ">", "<", ">=", "<=",
        "&&", "||", "!", "&", "|", "^", "~",
        "<<", ">>", ">>>", "=", "+=", "-=", "*=",
        "/=", "%=", "&=", "|=", "^=", "<<=", ">>=", ">>>=", "instanceof", "?:"
      ];

      const keywords = [
        "abstract", "assert", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extends", "final", "finally", "float",
        "for", "goto", "if", "implements", "import",
        "instanceof", "int", "interface", "long", "native",
        "new", "package", "private", "protected", "public",
        "return", "short", "static", "strictfp", "super",
        "switch", "synchronized", "this", "throw", "throws",
        "transient", "try", "void", "volatile", "while"
      ];

      const getNextInput = () => {
        if (lineIndex < lines.length) {
          return lines[lineIndex++].trim();
        }
        return '';
      };

      while (lineIndex < lines.length) {
        output += "Enter the Sentence (Enter 1 to exit) : \n";
        const inputString = getNextInput();
        if (!inputString) break;
        
        output += inputString + "\n";

        if (inputString === "1") {
          output += "Exiting..\n";
          break;
        }

        const matched: string[] = [];
        const unMatched: string[] = [];
        const opMatched: string[] = [];
        
        const tokens = inputString.split(/\W+/).filter(token => token.length > 0);
        const opTokens = inputString.split(/\s+/).filter(token => token.length > 0);

        for (const token of tokens) {
          if (keywords.includes(token)) {
            matched.push(token);
          } else {
            unMatched.push(token);
          }
        }

        for (const token of opTokens) {
          if (operators.includes(token)) {
            opMatched.push(token);
          }
        }

        output += "\n\nTokens :\n";
        for (let i = 0; i < tokens.length; i++) {
          output += tokens[i];
          if (i < tokens.length - 1) {
            output += ",";
          }
          if ((i + 1) % 3 === 0) {
            output += "\n";
          }
        }

        output += "\nMatched Keywords :\n";
        for (const mToken of matched) {
          output += mToken + "\n";
        }

        output += "\nMatched Operators :\n";
        for (const opToken of opMatched) {
          output += opToken + "\n";
        }

        output += "\nNon-Matched Keywords :\n";
        for (const umToken of unMatched) {
          output += umToken + "\n";
        }
        output += "\n";
      }

      return output;
    },
    interactiveRunner: async (addToTerminal, setWaitingForInput, setProgramState, userInput) => {
      const operators = ["+", "-", "*", "/", "%", "++", "--", "==", "!=", ">", "<", ">=", "<=",
        "&&", "||", "!", "&", "|", "^", "~",
        "<<", ">>", ">>>", "=", "+=", "-=", "*=",
        "/=", "%=", "&=", "|=", "^=", "<<=", ">>=", ">>>=", "instanceof", "?:"
      ];

      const keywords = [
        "abstract", "assert", "boolean", "break", "byte",
        "case", "catch", "char", "class", "const",
        "continue", "default", "do", "double", "else",
        "enum", "extends", "final", "finally", "float",
        "for", "goto", "if", "implements", "import",
        "instanceof", "int", "interface", "long", "native",
        "new", "package", "private", "protected", "public",
        "return", "short", "static", "strictfp", "super",
        "switch", "synchronized", "this", "throw", "throws",
        "transient", "try", "void", "volatile", "while"
      ];

      if (!userInput) {
        // Initialize program
        addToTerminal("Enter the Sentence (Enter 1 to exit) : ");
        setProgramState({ step: 'input' });
        setWaitingForInput(true);
        return;
      }

      if (userInput === "1") {
        addToTerminal("Exiting..");
        setWaitingForInput(false);
        return;
      }

      const matched: string[] = [];
      const unMatched: string[] = [];
      const opMatched: string[] = [];
      
      const tokens = userInput.split(/\W+/).filter(token => token.length > 0);
      const opTokens = userInput.split(/\s+/).filter(token => token.length > 0);

      for (const token of tokens) {
        if (keywords.includes(token)) {
          matched.push(token);
        } else {
          unMatched.push(token);
        }
      }

      for (const token of opTokens) {
        if (operators.includes(token)) {
          opMatched.push(token);
        }
      }

      addToTerminal("\n\nTokens :");
      let tokenLine = "";
      for (let i = 0; i < tokens.length; i++) {
        tokenLine += tokens[i];
        if (i < tokens.length - 1) {
          tokenLine += ",";
        }
        if ((i + 1) % 3 === 0 || i === tokens.length - 1) {
          addToTerminal(tokenLine);
          tokenLine = "";
        }
      }

      addToTerminal("\nMatched Keywords :");
      for (const mToken of matched) {
        addToTerminal(mToken);
      }

      addToTerminal("\nMatched Operators :");
      for (const opToken of opMatched) {
        addToTerminal(opToken);
      }

      addToTerminal("\nNon-Matched Keywords :");
      for (const umToken of unMatched) {
        addToTerminal(umToken);
      }

      await delay(1000);
      addToTerminal("\nEnter the Sentence (Enter 1 to exit) : ");
      setWaitingForInput(true);
    }
  }
];