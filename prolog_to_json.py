#!/usr/bin/python3
import argparse
import subprocess
import json
from term import separate_goal
from parse_term import parse_file

def remove_suffix(text, prefix):
    if text.endswith(prefix):
        return text[:len(text)-len(prefix)]
    return text

parser = argparse.ArgumentParser(prog='prolog_to_json.py',
                                 description="Translates a Prolog description of a TIM problem to JSON",
                                 formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument("problem_file", type=str, help="prolog-like file with the rules")
parser.add_argument("--out", type=str, default=None, help="Output file, if not set defaults to problem_file.json")
args = parser.parse_args()

goal, inferences = separate_goal(parse_file(args.problem_file))
if goal is not None: goal = goal.requirements[0].to_json_dict()
json_dict = {
    'goal' : goal,
    'axioms' : [inference.to_json_dict() for inference in inferences]
}
if args.out is None: out_file = remove_suffix(args.problem_file, '.pl')+'.json'
else: out_file = args.out

with open(out_file, 'w') as f:
    json.dump(json_dict, f)
