import { Parser } from "./parser";

/**
 * 与えられた任意の一文字と一致するパーサーを生成する
 */
export function char(c: string): Parser {
  // c は 1 文字でなければならない
  if (c.length !== 1) {
    throw new Error("char()'s argument is a character (= string of one length)");
  }

  return (text: string, position: number) => {
    if (text.length > position && text.charAt(position) === c) {
      return {
        position: position + 1,
        success: true,
      };
    }
    return {
      position,
      success: false,
    };
  };
}

/**
 * 任意の一文字と一致するパーサーを生成する
 */
export function anyChar(): Parser {
  return (text: string, position: number) => {
    if (text.length > position && text.charAt(position) !== "\n") {
      return {
        position: position + 1,
        success: true,
      };
    } else {
      return {
        position,
        success: false,
      };
    }
  };
}
