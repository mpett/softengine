def hello2():
    input_string = input()
    print("Hello, World.")
    print(input_string)

def ifelse():
    n = int(input())
    if (n % 2 != 0):
        print("Weird")
    elif (n % 2 == 0 and n in range(2, 5)):
        print("Not Weird")
    elif (n % 2 == 0 and n in range(6, 20)):
        print("Weird")
    elif (n % 2 == 0 and n > 20):
        print("Not Weird")

def hello():
    print("Hello, World!")

if __name__ == '__main__':
    hello2()