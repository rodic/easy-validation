import { expect } from "../helpers";

import * as L from "../../src/validators/length";

describe("Validators.Length", function() {
  describe("hasLengthOf", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          L.hasLengthOf({})(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and options are missing", function() {
        it("returns true", function() {
          expect(
            L.hasLengthOf({})("1")
          ).to.be.eql(true);
        });
      });

      context("and min option is present", function() {
        context("and string does not match criteria", function() {
          it("returns false", function() {
            expect(
              L.hasLengthOf({ min: 2 })("")
            ).to.be.eql(false);
          });
        });

        context("and string matches criteria", function() {
          it("returns true", function() {
            expect(
              L.hasLengthOf({ min: 2 })("12")
            ).to.be.eql(true);
          });
        });
      });

      context("and max option is present", function() {
        context("and string does not match criteria", function() {
          it("returns false", function() {
            expect(
              L.hasLengthOf({ max: 2 })("123")
            ).to.be.eql(false);
          });
        });

        context("and string matches criteria", function() {
          it("returns true", function() {
            expect(
              L.hasLengthOf({ max: 2 })("12")
            ).to.be.eql(true);
          });
        });
      });
    });
  });
});
