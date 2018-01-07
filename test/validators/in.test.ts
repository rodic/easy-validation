import { expect } from "../helpers";

import * as I from "../../src/validators/in";

describe("Validators.In", function() {
  describe("isIn", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          I.isIn(["a"])(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and is not in the array", function() {
        it("returns false", function() {
          expect(
            I.isIn(["a"])("b")
          ).to.be.eql(false);
        });
      });

      context("and is in the array", function() {
        it("returns true", function() {
          expect(
            I.isIn(["a", "b"])("b")
          ).to.be.eql(true);
        });
      });
    });
  });
});
