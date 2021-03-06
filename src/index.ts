import { Parser, token, seq, or, option, lazy, many, anyChar } from "./parser/index.ts";

const emptyLineParser = token("\n");

const headerTagParser = or(
  token("add"),
  token("modify"),
  token("fix"),
  token("refactor")
  );
const headerLineParser = seq(
  token("["),
  headerTagParser,
  token("]"),
  token(": "),
  many(anyChar()),
  token("\n")
  );

const notEmptyLineParser = seq(many(anyChar()), token("\n"));
const bodyLinesParser = seq(notEmptyLineParser, option(lazy(() => bodyLinesParser)));

const footerLineParser = notEmptyLineParser;

const commitMessageParser = seq(
  headerLineParser,
  option(seq(
    emptyLineParser,
    bodyLinesParser
  )),
  option(seq(
    emptyLineParser,
    footerLineParser
  ))
);

function test(parser: Parser, text: string): boolean {
  const parsed = parser(text, 0);
  return parsed.success && parsed.position === text.length;
}
export function testCommitMessage(text: string): boolean {
  return test(commitMessageParser, text);
}
