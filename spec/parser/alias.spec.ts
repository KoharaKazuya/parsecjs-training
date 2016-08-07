import { expect } from "chai";
import { token, many } from "../../src/parser/alias";

describe("parser/alias", () => {
  describe("token parser", () => {
    const abcParser = token("abc");

    it("与えられた文字列と同じ文字列をパースすると成功を返すべき", () => {
      const { success } = abcParser("abc", 0);
      expect(success).to.be.true;
    });

    it("与えられた文字列と同じ文字列をパースすると末尾の位置まで読み進めるべき", () => {
      const { position } = abcParser("abc", 0);
      expect(position).to.be.equals(3);
    });

    it("与えられた文字列と異なる文字列をパースすると失敗するべき", () => {
      const { success } = abcParser("def", 0);
      expect(success).to.be.false;
    });
  });

  describe("many parser", () => {
    const abcParser = token("abc");
    const manyAbcParser = many(abcParser);

    it("空文字列にはマッチしない", () => {
      const { success } = manyAbcParser("", 0);
      expect(success).to.be.false;
    });

    it("複数の繰返しにマッチするべき", () => {
      const { success, position } = manyAbcParser("abcabc", 0);
      expect(success).to.be.true;
      expect(position).to.be.equals(6);
    });

    it("繰り返し中に異なる文字が入ると失敗するべき", () => {
      const { position } = manyAbcParser("abc abc", 0);
      expect(position).to.be.not.equals(7);
    });
  });
});
