import { expect } from "chai";
import { char, anyChar } from "../../src/parser/generator";

describe("parser/generator", () => {
  describe("char parser", () => {
    const aParser = char("a");

    it("与えられた文字と同じ文字をパースすると成功を返すべき", () => {
      const { success } = aParser("a", 0);
      expect(success).to.be.true;
    });

    it("与えられた文字と同じ文字をパースすると末尾の位置まで読み進めるべき", () => {
      const { position } = aParser("a", 0);
      expect(position).to.be.equals(1);
    });

    it("与えられた文字と異なる文字をパースすると失敗するべき", () => {
      const { success } = aParser("d", 0);
      expect(success).to.be.false;
    });
  });

  describe("anyChar parser", () => {
    const anyCharParser = anyChar();

    it("どんな文字でもパースすると成功を返すべき", () => {
      expect(anyCharParser("a", 0).success).to.be.true;
      expect(anyCharParser("b", 0).success).to.be.true;
      expect(anyCharParser("c", 0).success).to.be.true;
    });

    it("一つだけ読み進めるべき", () => {
      expect(anyCharParser("abc", 1).position).to.be.equals(2);
    });

    it("空文字列にはマッチしない", () => {
      expect(anyCharParser("", 0).success).to.be.false;
    });

    it("改行文字にはマッチしない", () => {
      expect(anyCharParser("\n", 0).success).to.be.false;
    });
  });
});
