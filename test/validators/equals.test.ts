import { expect } from "../helpers";

import * as E from "../../src/validators/equals";

describe("Validators.Equals", function() {
  describe("equals", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          E.equals("a")(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and they are not equal", function() {
        it("returns false", function() {
          expect(
            E.equals("a")("b")
          ).to.be.eql(false);
        });
      });

      context("and they are equal", function() {
        it("returns true", function() {
          expect(
            E.equals("a")("a")
          ).to.be.eql(true);
        });
      });
    });
  });
});
