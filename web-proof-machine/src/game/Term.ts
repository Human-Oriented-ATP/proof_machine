import { exec } from 'child_process'
import * as fs from 'fs'
var execSync = require('child_process').execSync

type VarName = string

type FnName = string | number

type Term = 
    | { var : VarName } 
    | { label : FnName, args : Term[] }

function collectVars(t : Term) : VarName[] {
    if ("var" in t) {
        return [t.var]
    } else {
        return t.args.flatMap(collectVars)
    }
}

function collectVarsDedup(t : Term) : VarName[] {
    return collectVars(t)
    .filter((varName, idx, arr) => arr.indexOf(varName) === idx) 
}

function substitute(v : VarName, s : Term, t : Term) : Term {
    if ("var" in t) {
        if (v === t.var) {
            return s
        } else {
            return t
        }
    } else {
        return {
            label : t.label,
            args : t.args.map((u) => substitute(v, s, u))
        }
    }
}

function isEq(s : Term, t : Term) : boolean {
    if ("var" in s && "var" in t) {
        return s.var === t.var
    } if ("args" in s && "args" in t) {
        return (s.label === t.label) && 
                (s.args.length === t.args.length) &&
                (s.args.every((arg, idx) => arg === t.args[idx]))
    } else { return false }
}

function containsVar(v : VarName, t : Term) : boolean {
    return v in collectVars(t)
}

function instantiateVars(ctx : Map<VarName, Term>, t : Term) : Term {
    if ("var" in t) {
        const s = ctx.get(t.var)
        if (s === undefined) {
            return t
        } else {
            return s
        }
    } else {
        return {
            label : t.label,
            args : t.args.map((arg) => instantiateVars(ctx, arg))
        }
    }
}

function assign(ctx : Map<VarName, Term>, v : VarName, t : Term) : void | undefined {
    const t_ = instantiateVars(ctx, t)
    if (containsVar(v, t_)) {
        return undefined    // occur check failed
    }
    const s = ctx.get(v)
    if (s === undefined) {
        // TODO: Check that this actually mutates the map
        ctx.forEach((val, key) => ctx.set(key, substitute(v, t, val)))
        ctx.set(v, t)
    } else {
        if (!isEq(s, t)) {
            return undefined    // inconsistent assignment
        }
    }
}

function unify(ctx : Map<VarName, Term>, s : Term, t : Term) : void | undefined {
    if ("var" in s) {
        const s_ = ctx.get(s.var)
        if (s_ === undefined) {
            assign(ctx, s.var, t)
        } else {
            unify(ctx, s_, t)
        }
    } else if ("var" in t) {
        const t_ = ctx.get(t.var)
        if (t_ === undefined) {
            assign(ctx, t.var, s)
        } else {
            unify(ctx, s, t_)
        }
    } else {
        if (s.label !== t.label) {
            return undefined
        }
        if (s.args.length !== t.args.length) {
            return undefined
        }
        s.args.forEach((arg, idx) => unify(ctx, arg, t.args[idx]))
    }
}

type Axiom = { hypotheses : Term[], conclusions : Term[] }

type ProblemState = { goal : Term, axioms : Axiom[] }

function instantiateFresh(axiom : Axiom, suffix : string) : Axiom {
    const vars : VarName[] = 
        (axiom.hypotheses.flatMap(collectVarsDedup)
        .concat(axiom.conclusions.flatMap(collectVarsDedup)))
        .filter((varName, idx, arr) => arr.indexOf(varName) === idx)
    const substCtx = new Map<VarName, Term>()
    vars.forEach((varName) => 
        substCtx.set(varName, { "var" : varName + suffix }))
    return {
        hypotheses : axiom.hypotheses.map((t) => instantiateVars(substCtx, t)),
        conclusions : axiom.conclusions.map((t) => instantiateVars(substCtx, t))
    }
}

function parseState(file : string) : ProblemState {
    console.log(`Parsing file ${file} ...`)
    execSync(`../prolog_to_json.py ${file}.pl`)
    let result : ProblemState = JSON.parse(fs.readFileSync(file + ".js", 'utf-8'))
    console.log(result)
    return result
}

parseState("../jacob_problem8")