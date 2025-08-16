import java.sql.SQLOutput;
import java.util.Scanner;


public class BankAccount {
    static Scanner sc = new Scanner(System.in);
   static char currency = '₹';

    public static void main (String[] args) throws InterruptedException {
        double balanceOld = 0, withdraw = 0, deposit = 0 ;
        String name;
        int age, pin = 0000;
        String phoneNo ;
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
        System.out.println("Welcome, " + name  + "! what operations would you like to perform.. ");
      while (true) {
          System.out.println("\n");
          System.out.println("Choose Operations : \n1. Check Balance\n2. Deposit Amount\n3. Withdraw Amount\n4.View Account Details\n5. exit..!");

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

                      System.out.println("Your Current balance is \n" + currency + calculateBalance(balanceOld, withdraw, deposit));
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

          System.out.println("\n");


  }
    }
    static boolean verifyPin(int userPin) throws InterruptedException {
        int enteredPin;
        Thread.sleep(400);
        System.out.println("!!! Enter PIN to Perform the Operation !!!");
        enteredPin = sc.nextInt();
        if(String.valueOf(Math.abs(enteredPin)).length()!=4) {
            System.out.println("!!!Enter a 4 digit PIN, OPERATION FAILED!");
            Thread.sleep(2000);
            return false;
        }
      if (enteredPin == userPin) {
          Thread.sleep(800);
          System.out.println("Please wait, processing ... ");
          Thread.sleep(200);
      return true;
      }

        else {


          System.out.println("Wrong PIN, Try again");
          Thread.sleep(2000);
            return false;

        }
    }


    static double calculateBalance(double  oldBalance, double withdraw, double deposit){
       double newBalance = oldBalance + deposit - withdraw;
        return newBalance;
    }

    static double handleDeposit (double oldBalance ){
        double newBalance = oldBalance, deposit;
        System.out.println("Enter the amount you want to deposit! \n");
        deposit = sc.nextDouble();
        newBalance = calculateBalance(oldBalance, 0, deposit);
        System.out.println("--- Amount " + currency + deposit  + " deposit successful! ---");
        return newBalance;
    }

    static double handleWithdraw(double oldBalance) {

        double withdrawAmount;
        System.out.println("Enter the amount you wan to withdraw!");
        withdrawAmount = sc.nextDouble();
        double newBalance = oldBalance;
        if (withdrawAmount > oldBalance){
            System.out.println("!!!You don't have enough balance to complete this transaction");

        }
        else if(withdrawAmount%100!=0) {
            System.out.println("Please enter the value in multiple of 100 !!");
        } else if (withdrawAmount <= 0) {
            System.out.println("Please enter a valid amount");
        }
        else {
            newBalance = calculateBalance(oldBalance, withdrawAmount, 0);
            System.out.println("--- Amount " + currency + withdrawAmount  + " withdraw successful! ---");
        }

     return newBalance;
    }
}
