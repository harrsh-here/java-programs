import java.util.Scanner;

public class TempratureConverter {

    public static void main(String[] args) {


        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\nEnter Choice:");
            System.out.println("1. C -> F\n2. F -> C");
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
}
