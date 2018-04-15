import { expect } from "../helpers";

import * as N from "../../src/validators/numeric";

describe("Validators.Numeric", function() {
  describe("isNumeric", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          N.isNumeric()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and string is not numeric", function() {
        it("returns false", function() {
          expect(
            N.isNumeric()("a1")
          ).to.be.eql(false);
        });
      });

      context("and string is numeric", function() {
        it("returns true", function() {
          expect(
            N.isNumeric()("01")
          ).to.be.eql(true);
        });
      });
    });
  });

  describe("isNotNumeric", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          N.isNotNumeric()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and string is not numeric", function() {
        it("returns true", function() {
          expect(
            N.isNotNumeric()("a1")
          ).to.be.eql(true);
        });
      });

      context("and string is numeric", function() {
        it("returns false", function() {
          expect(
            N.isNotNumeric()("01")
          ).to.be.eql(false);
        });
      });
    });
  });
});
