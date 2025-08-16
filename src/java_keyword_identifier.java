import java.util.ArrayList;
import java.util.Scanner;
import java.util.Arrays;


public class java_keyword_identifier {
                              //Check Multiple words at once
    public static <string> void main(String[] args) {
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


            int m = 0, uM = 0;
            ArrayList<String> matched = new ArrayList<>();
            ArrayList<String> unMatched = new ArrayList<>();
            String[] tokens = toCheck.split("\\W+");


            for (String token : tokens) {
                if (Arrays.asList(keywords).contains(token)) {
                    matched.add(token);
                } else {
                    unMatched.add(token);
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
            System.out.println("\n\n");
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


}

