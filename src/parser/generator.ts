import { Parser } from './parser';

/**
 * 任意の固定長文字列 (トークン) と一致するパーサーを生成する
 */
export function token(str: string): Parser {
  return (text: string, position: number) => {
    const sub = text.substr(position, str.length);
    if (sub === str) {
      return {
        success: true,
        position: position + str.length,
      };
    }
    return {
      success: false,
      position,
    };
  }
}

/**
 * 任意の正規表現とマッチするパーサーを生成する
 */
export function regexp(exp: RegExp): Parser {
  return (text: string, position: number) => {
    const sub = text.substr(position);
    const arr = exp.exec(sub);
    if (arr && arr.index === 0) {
      const matchedStr = arr[0];
      return {
        success: true,
        position: position + matchedStr.length,
      };
    }
    return {
      success: false,
      position,
    };
  }
}