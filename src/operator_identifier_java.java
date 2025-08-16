import java.util.ArrayList;
import java.util.Optional;
import java.util.Scanner;
import java.util.Arrays;
public class operator_identifier_java {

    public static void main(String[] args){
       Scanner sc = new Scanner(System.in) ;
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




//    for(String token : tokens) {
//        System.out.println(token);
//    }

    if(toCheck.equals("1")) {
        System.out.println("Exiting..");
        break;
    }


   // int m = 0, uM = 0;
    ArrayList<String> matched = new ArrayList<>();
    ArrayList<String> unMatched = new ArrayList<>();
    ArrayList<String> opMatched = new ArrayList<>();
    String[] tokens = toCheck.split("\\W+");
    String[] opTokens =toCheck.split("\\s+");



    for (String token : tokens) {
        if (Arrays.asList(keywords).contains(token)) {
            matched.add(token);
        }

        else {
            unMatched.add(token);
        }
    }

    for (String token : opTokens) {
        if (Arrays.asList(operators).contains(token)) {
            opMatched.add(token);
        }
    }

    System.out.println("\n\n");

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
//    if(Arrays.asList(operators).contains(toCheck)){
//        System.out.println(toCheck  + " is an operator in java");
//    }

    System.out.println();
    System.out.println("Non-Matched Keywords :");
    for (String umToken : unMatched) {

        System.out.println(umToken);
    }



}
    }
}
