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
    split_and_join()