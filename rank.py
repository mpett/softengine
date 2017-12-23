from collections import Counter

def collections_counter():
    X = int(input())
    word = input()
    shoe_list = word.split()
    shoe_list = list(map(int, shoe_list))
    N = int(input())
    sum = 0
    for i in range(0, N):
        word = input()
        shoe_and_price = word.split()
        shoe_and_price = list(map(int, shoe_and_price))
        shoe = shoe_and_price[0]
        price = shoe_and_price[1]
        if (shoe_list.__contains__(shoe)):
            sum += price
            shoe_list.remove(shoe)
    print(sum)

def discard_remove():
    n = int(input())
    a = input()
    N = int(input())
    l = a.split()
    l = list(map(int, l))
    numbers = set(l)
    for i in range(0, N):
        words = input()
        words = words.split(" ")
        command = words[0]
        number = 0
        if (command != "pop"):
            number = int(words[1])
        if (command == "remove"):
            numbers.remove(number)
        elif (command == "pop"):
            numbers.pop()
        elif (command == "discard"):
            numbers.discard(number)
    number_sum = sum(numbers)
    print(number_sum)

def set_add():
    N = int(input())
    stamps = set([])
    for i in range(0,N):
        word = input()
        stamps.add(word)
    print(len(stamps))

def no_idea():
    word = input()
    words = word.split(" ")
    n = int(words[0])
    m = int(words[1])
    a = input()
    l = a.split()
    l = list(map(int, l))
    A = input()
    Al = A.split()
    Al = list(map(int, Al))
    A = set(Al)
    B = input()
    Bl = B.split()
    Bl = list(map(int, Bl))
    B = set(Bl)
    happiness = 0
    for value in l:
        if (A.__contains__(value)):
            happiness += 1
        elif (B.__contains__(value)):
            happiness -= 1
    print(happiness)

def systemic_difference():
    M = int(input())
    a = input()
    lis = a.split()
    intlis = list(map(int, lis))
    intset = set(intlis)
    N = int(input())
    b = input()
    b_lis = b.split()
    b_intlis = list(map(int, b_lis))
    b_intset = set(b_intlis)
    union = intset.union(b_intset)
    intersection = intset.intersection(b_intset)
    result = union - intersection
    sorted_result = sorted(result)
    for value in sorted_result:
        print(value)

def set_average():
    N = int(input())
    word = input()
    words = word.split(" ")
    list_of_numbers = []
    for word in words:
        list_of_numbers.append(int(word))
    number_set = set(list_of_numbers)
    average = sum(number_set) / len(number_set)
    print(average)

# Please update me
def capitalize():
    word = input()
    words = word.split(" ")
    for index in range(len(words)):
        part = words[index]
        part = part.capitalize()
        words[index] = part
    word = str(words)
    print(word)

# Still getting runtime error here.
def second_format_number():
    total = int(input())
    for number in range(1, total + 1):  
        binary = str("{0:b}".format(number))
        hexadecimal = str(hex(number))
        hexadecimal = del_char(hexadecimal, [0,1])
        hexadecimal = hexadecimal.upper()
        octal = str(oct(number))
        octal = del_char(octal, [0])
        print(str(number) + " " + octal + " " +
            hexadecimal + " " + binary)

def del_char(string, indexes):
    return ''.join((char for idx, 
                char in enumerate(string) 
                        if idx not in indexes))

# Works fina locally, runtime error on site.
def format_number(total):
    for number in range(1, total + 1):
        binary = str("{0:b}".format(number))
        hexadecimal = str(hex(number))
        hexadecimal = hexadecimal[2:]
        hexadecimal = hexadecimal.upper()
        octal = str(oct(number))
        octal = octal[1:]
        print(str(number) + " " + octal + " " +
            hexadecimal + " " + binary)

def wrap():
    string = input()
    n = int(input())
    print(textwrap.fill(string, n))

def any_validators():
    input_string = input()
    result = False
    for i, c in enumerate(input_string):
        if (c.isalnum()):
            result = True
    print (result)
    result = False
    for i, c in enumerate(input_string):
        if (c.isalpha()):
            result = True
    print (result)
    result = False
    for i, c in enumerate(input_string):
        if (c.isdigit()):
            result = True
    print (result)
    result = False
    for i, c in enumerate(input_string):
        if (c.islower()):
            result = True
    print (result)
    result = False
    for i, c in enumerate(input_string):
        if (c.isupper()):
            result = True
    print (result)

def validators():
    input_string = input()
    if (input_string.isalnum()):
        print("True")
    else:
        print("False")
    if (input_string.isalpha()):
        print("True")
    else:
        print("False")
    if (input_string.isdigit()):
        print("True")
    else:
        print("False")
    if (input_string.islower()):
        print("True")
    else:
        print("False")
    if (input_string.isupper()):
        print("True")
    else:
        print("False")

def find_a_string():
    string = input()
    substring = input()
    found = True
    discoveries = 0
    discovery_index = 0
    while(found):
        resulting_index = string.find(substring, discovery_index)
        if (resulting_index == -1):
            found = False
        else:
            discoveries += 1
            discovery_index += resulting_index + 1
    print(discoveries)

def mutate_string():
    original_word = input()
    mutation_input = input()
    split = mutation_input.split(" ")
    character = split[1]
    index = int(split[0])
    l = list(original_word)
    l[index] = character
    result = ''.join(l)
    print(result)

# Works fine on my own test, but gets runtime 
# error on site.
def mutations():
    original_word = input()
    mutation_input = input()
    mutation_input = mutation_input.split(" ")
    index = int(mutation_input[0])
    character = mutation_input[1]
    result = original_word[:index] + character + original_word[index:]
    print(result)

def whats_your_name():
    first_name = input()
    last_name = input()
    result = "Hello " + first_name + " " + last_name + "!"
    result += " You just delved into python."
    print(result)

def split_and_join():
    input_string = input()
    split_input = input_string.split(" ")
    delimiter = "-"
    result = delimiter.join(split_input)
    print(result)

def swap_case():
    input_string = input()
    swapped = input_string.swapcase()
    print(swapped)

def finding_percentage():
    N = int(input())
    school = []
    for i in range(0, N):
        student_dict = {}
        input_words = input().split(" ")
        student_dict['Name'] = input_words[0]
        student_dict['first_mark'] = float(input_words[1])
        student_dict['second_mark'] = float(input_words[2])
        student_dict['third_mark'] = float(input_words[3])
        school.append(student_dict)
    lookup_student = input()
    for i in range(0, N):
        student_dict = school[i]
        if (student_dict['Name'] == lookup_student):
            print("%.2f" % grade_average(student_dict))

def grade_average(student):
    first_mark = student['first_mark']
    second_mark = student['second_mark']
    third_mark = student['third_mark']
    grade_point_average = (first_mark 
        + second_mark + third_mark) / 3
    return grade_point_average

def nested_lists():
    n = int(input())
    students = []
    for i in range(0,n):
        name = input()
        grade = float(input())
        element = [name, grade]
        students.append(element)
    grade_key = lambda x : x[1]
    student_key = lambda x : x[0]
    students = [i for i in students 
        if greater_than(i, 
            min(students, key = grade_key))]
    students = [i for i in students 
        if not greater_than(i,
            min(students, key = grade_key))]
    students.sort(key = student_key)
    for student in students:
        print(student[0])

def greater_than(first_element, second_element):
    if (first_element[1] > second_element[1]):
        return True
    else:
        return False

def second_maximum():
    n = int(input())
    word = input()
    list_of_numbers = list(map(int, word.split(" ")))
    list_of_numbers = [i for i in list_of_numbers 
                        if i < max(list_of_numbers)]
    print(max(list_of_numbers))

def comprehensions():
    x = int(input()) 
    y = int(input())
    z = int(input()) 
    n = int(input())
    
    print([ [i, j, k] for i in range(x+1) 
                        for j in range(y+1) 
                            for k in range(z+1) 
                                if ((i + j + k) != n)])

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
        print("lol")
        #print(i, sep='', end='', flush=True) <-- Gives me syntax error

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
    collections_counter()