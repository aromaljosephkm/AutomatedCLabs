import os
import time
import sys
import threading


def solution_checker(user):
    inputfile = "program/" + user + ".c"
    outputfile = "output/" + user + ".txt"
    os.system("gcc " + inputfile + " -o " + user)
    os.system("./" + user + " > " + outputfile)
    infile = open("output/originaloutput.txt")
    outfile = open(outputfile)
    i = 0
    for line1 in infile:
        i += 1
        for line2 in outfile:
            if line1 == line2:
                print("Line ", i, ": IDENTICAL")
            else:
                print("Line ", i, ":")
                print("\tFile 1:", line1, end='')
                print("\tFile 2:", line2, end='')
            break
    infile.close()
    outfile.close()


userid = sys.argv[1]
solution_checker(userid)
