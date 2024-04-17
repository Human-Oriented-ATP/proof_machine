import { createToken, Lexer } from "chevrotain"

export const Atom = createToken({
    name: "Atom",
    pattern: /[a-z]\w*/
  })

export const Number = createToken({
    name: "Number",
    pattern: /\d+/
})

export const Variable = createToken({
    name: "Variable",
    pattern: /[A-Z_]\w*/
})

export const Entails = createToken({ name: "Entails", pattern: /:-/ });

export const Comma = createToken({ name: "Comma", pattern: /,/ })

export const FullStop = createToken({ name: "FullStop", pattern: /./ })

export const LeftParen = createToken({ name: "LeftParen", pattern: /\(/ })

export const RightParen = createToken({ name: "RightParen", pattern: /\)/ })

export const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
  })

export const allTokens = [
    WhiteSpace,
    Entails,
    LeftParen,
    RightParen,
    Comma,
    FullStop,
    Atom,
    Number,
    Variable,
]

export const PrologLexer = new Lexer(allTokens)

export function tokenize(text: string) {
  const result = PrologLexer.tokenize(text)

  if (result.errors.length > 0) {
    const msg = result.errors.map((error) => `[${error.line}:${error.column}] ${error.message}`).join(', ')
    throw new Error(`Error tokenizing the text. ${msg}`)
  }

  return result.tokens
}