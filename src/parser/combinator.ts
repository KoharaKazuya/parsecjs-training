import { Parser } from "./parser";

/**
 * 与えられたパーサーと順番にマッチするパーサーを生成する
 */
export function seq(...parsers: Parser[]): Parser {
  return (text: string, position: number) => {
    for (let parser of parsers) {
      const ret = parser(text, position);
      if (!ret.success) {
        return {
          success: false,
          position,
        };
      }
      position = ret.position;
    }
    return {
      success: true,
      position,
    };
  };
}

/**
 * 与えられたいずれかのパーサーとマッチするパーサーを生成する
 */
export function or(...parsers: Parser[]): Parser {
  return (text: string, position: number) => {
    for (let parser of parsers) {
      const ret = parser(text, position);
      if (ret.success) {
        return ret;
      }
    }
    return {
      success: false,
      position,
    };
  };
}

/**
 * 与えられたパーサーにマッチしなくても成功とするパーサーを生成する
 */
export function option(parser: Parser): Parser {
  return (text: string, position: number) => {
    const ret = parser(text, position);
    if (ret.success) {
      return ret;
    } else {
      return {
        success: true,
        position,
      };
    }
  };
}
