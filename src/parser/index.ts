import { Parser } from './parser';
export * from './parser.d.ts';
export * from './generator.ts';
export * from './combinator.ts';

/**
 * 遅延評価
 */
export function lazy(parserProvider: () => Parser): Parser {
  let parser: Parser = undefined;
  return (text: string, position: number) => {
    if (!parser) parser = parserProvider();
    return parser(text, position);
  }
}
