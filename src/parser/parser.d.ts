/**
 * パーサーによるパース処理結果
 */
export interface ParseResult {
  success: boolean,
  position: number,
}

/**
 * パーサー
 */
export interface Parser {
  (text: string, position: number): ParseResult,
}
