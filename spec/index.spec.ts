import { expect } from "chai";
import { testCommitMessage } from "../src/index.ts";

describe("parsecjs-training package", () => {
  describe("#testCommitMessage()", () => {

    it("ヘッダー行のフォーマットが正しくないと失敗する", () => {
      const message = "タグ無し\n";
      expect(testCommitMessage(message)).to.be.false;
    });
  });
});
