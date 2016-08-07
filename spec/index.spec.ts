import { expect } from "chai";
import { testCommitMessage } from "../src/index.ts";

describe("parsecjs-training package", () => {
  describe("#testCommitMessage()", () => {

    it("ヘッダー行のフォーマットが正しくないと失敗する", () => {
      const message = "タグ無し\n";
      expect(testCommitMessage(message)).to.be.false;
    });

    it("ヘッダー行だけで OK", () => {
      const message = "[add]: test\n";
      expect(testCommitMessage(message)).to.be.true;
    });

    it("ヘッダー行は 1 行のみ", () => {
      const message = "[add]: test\n[fix]: test2\n";
      expect(testCommitMessage(message)).to.be.false;
    });

    it("ヘッダー行とボディの間には空白行が 1 行あれば OK", () => {
      const message = "[add]: test\n\nbodymessage\n";
      expect(testCommitMessage(message)).to.be.true;
    });

    it("ヘッダー行とボディ行の間に空白行が 2 行あってはならない", () => {
      const message = "[add]: test\n\n\nbodymessage\n";
      expect(testCommitMessage(message)).to.be.false;
    });
  });
});
