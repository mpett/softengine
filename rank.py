def print_between():
    N = int(input())
    for i in range(1, N+1):
        print(i, sep='', end='', flush=True)

def leap_year():
    year = int(input())
    if (year % 4 == 0):
        if (year % 100 == 0):
            if (year % 400 == 0):
                print("True")
            else:
                print("False")
        else:
            print("True")
    else:
        print("False")

def loops():
    N = int(input())
    for i in range(0, N):
        print(i*i)

def division():
    a = int(input())
    b = int(input())
    print (a//b)
    c = a / float(b)
    print(c)

def arithmetic_operators():
    a = int(input())
    b = int(input())
    print(a+b)
    print(a-b)
    print(a*b)

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
    print_between()