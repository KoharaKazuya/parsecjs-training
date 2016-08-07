import { Parser } from "./parser";
import { char } from "./generator";
import { seq, option } from "./combinator";

/**
 * 任意の固定長文字列 (トークン) と一致するパーサーを生成する
 */
export function token(str: string): Parser {
  const charParsers = str.split("").map((c) => char(c));
  return seq(...charParsers);
}

/**
 * 与えられたパーサーに 1 回以上マッチするパーサーを生成する
 */
export function many(parser: Parser): Parser {
  const manyParser = seq(parser, option(lazy(() => manyParser)));
  return manyParser;
}

/**
 * 遅延評価
 */
export function lazy(parserProvider: () => Parser): Parser {
  let parser: Parser = undefined;
  return (text: string, position: number) => {
    if (!parser) {
      parser = parserProvider();
    }
    return parser(text, position);
  };
}
