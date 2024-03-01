#!/usr/bin/python3
import argparse
import subprocess

from parse_term import parse_file

parser = argparse.ArgumentParser(prog='hammer.py',
                                 description="Asks a hammer to solve Tim's problem",
                                 formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument("problem_file", type=str, help="prolog-like file with the rules")
parser.add_argument("hammer", type=str, nargs='?', default=None, help="Hammer to be run as command (vampire, eprover, ...)")
args = parser.parse_args()

inferences = parse_file(args.problem_file)
tptp = ''.join(
    inference.to_tptp('gadget_{}'.format(i+1))+'\n'
    for i, inference in enumerate(inferences)
)
print("TPTP problem:")
print(tptp)

if args.hammer is not None:
    solver_result = subprocess.run(
        args.hammer,
        input = tptp.encode(),
        capture_output = False,
    )
