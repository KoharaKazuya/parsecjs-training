import { Parser, token, regexp, seq, or, option, lazy } from "./parser/index.ts";

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
  regexp(/.+/),
  token("\n")
  );

const notEmptyLineParser = seq(regexp(/.+/), token("\n"));
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
  if (parsed.success && parsed.position === text.length) {
    console.log(
      `%c成功しました\n%c------\n%c${ text }`,
      "font: bold; color: green",
      "color: gray",
      ""
      );
    return true;
  } else {
    console.log(
      `%c${ parsed.position + 1 } 文字目で失敗しました\n%c------\n%c${ text }`,
      "font: bold; color: red",
      "color: gray",
      ""
      );
    return false;
  }
}
export function testCommitMessage(text: string): boolean {
  return test(commitMessageParser, text);
}
