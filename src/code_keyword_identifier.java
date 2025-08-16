import java.util.Arrays;
import java.util.Scanner;

public class code_keyword_identifier {  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
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
    while(true){
        System.out.print("Enter The Code (Enter 1 to Exit) : ");
        String toCheck = sc.nextLine();

        if(toCheck.equals("1")){
            System.out.println("Exiting..!");
            break;
        }
        System.out.println("Checking....");


        boolean ifMatch = Arrays.asList(keywords).contains(toCheck);
        if (ifMatch) {
            System.out.println("Match Found!!\n " + toCheck + " is a Keyword in JAVA");
        } else {
            System.out.println("Match Not Found!!\n " + toCheck + " is not a Keyword in JAVA");

        }
    }
}
}
