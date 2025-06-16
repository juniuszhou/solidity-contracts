import subprocess
import time
def main():
    my_list=[
    "ONE, One",
    "TWO, Two",
    "THREE, Three",
    "FOUR, Four",
    "FIVE, Five",
    "SIX, Six",
    "SEVEN, Seven",
    "EIGHT, Eight",
    "NINE, Nine",
    "TEN, Ten",
    "ELEVEN, Eleven",
    "TWELVE, Twelve",
    "THIRTEEN, Thirteen",
    "FOURTEEN, Fourteen",
    "FIFTEEN, Fifteen",
    "SIXTEEN, Sixteen",
    "SEVENTEEN, Seventeen",
    "EIGHTEEN, Eighteen",
    "NINETEEN, Nineteen",
    "TWENTY, Twenty"
    ]

    for item in my_list:
        result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
        print(result.stdout)  # Print output
        time.sleep(30)
        # print(result.returncode) 
        # print (item);

main()