def tuples():
    n = int(input())
    word = input()
    words = word.split(" ")
    numbers = list(map(int, words))
    number_tuple = tuple(numbers)
    hashed_number_tuple = hash(number_tuple)
    print(hashed_number_tuple)

def lists():
    N = int(input())
    output_list = []
    for i in range(0, N):
        input_string = input()
        inputs = input_string.split(" ")
        if (inputs[0] == "insert"):
            index = int(inputs[1])
            value = int(inputs[2])
            output_list.insert(index, value)
        if (inputs[0] == "print"):
            print (output_list)
        if (inputs[0] == "remove"):
            value = int(inputs[1])
            output_list.remove(value)
        if (inputs[0] == "append"):
            value = int(inputs[1])
            output_list.append(value)
        if (inputs[0] == "sort"):
            output_list.sort()
        if (inputs[0] == "pop"):
            output_list.pop()
        if (inputs[0] == "reverse"):
            output_list.reverse()

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
    tuples()