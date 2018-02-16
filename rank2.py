#Replace all ______ with rjust, ljust or center. 

def door_mat():
    N, M = map(int,raw_input().split()) # More than 6 lines of code will result in 0 score. Blank lines are not counted.
    for i in xrange(1,N,2): 
        print("-")
    welcome_row_counter = (M - 7) / 2        
    welcome = ""
    for c in range(0, welcome_row_counter):    
        welcome += "-"
    welcome += "WELCOME"
    for c in range(0, welcome_row_counter):    
        welcome += "-"
    print(welcome)
    for i in xrange(N-2,-1,-2): 
        print("|")

def alignment():
    thickness = int(raw_input()) #This must be an odd number
    c = 'H'

    #Top Cone
    for i in range(thickness):
        print (c*i).rjust(thickness-1)+c+(c*i).ljust(thickness-1)

    #Top Pillars
    for i in range(thickness+1):
        print (c*thickness).center(thickness*2)+(c*thickness).center(thickness*6)

    #Middle Belt
    for i in range((thickness+1)/2):
        print (c*thickness*5).center(thickness*6)    

    #Bottom Pillars
    for i in range(thickness+1):
        print (c*thickness).center(thickness*2)+(c*thickness).center(thickness*6)    

    #Bottom Cone
    for i in range(thickness):
        print ((c*(thickness-i-1)).rjust(thickness)+c+(c*(thickness-i-1)).ljust(thickness)).rjust(thickness*6)    

if __name__ == '__main__':
    door_mat()