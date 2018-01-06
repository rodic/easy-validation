import { expect } from "../helpers";

import * as C from "../../src/validators/contains";

describe("Validators.Contains", function() {
  describe("contains", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          C.contains("34")(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and it does not contain the seed", function() {
        it("returns false", function() {
          expect(
            C.contains("34")("123")
          ).to.be.eql(false);
        });
      });

      context("and it contains the seed", function() {
        it("returns true", function() {
          expect(
            C.contains("34")("123456")
          ).to.be.eql(true);
        });
      });
    });
  });
});
