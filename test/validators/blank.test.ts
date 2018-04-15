import { expect } from "../helpers";

import * as B from "../../src/validators/blank";

describe("Validators.Blank", function() {
  describe("isNotBlank", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          B.isNotBlank()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and is blank", function() {
        it("returns false", function() {
          expect(
            B.isNotBlank()("")
          ).to.be.eql(false);
        });
      });

      context("and is not blank", function() {
        it("returns true", function() {
          expect(
            B.isNotBlank()("abc")
          ).to.be.eql(true);
        });
      });
    });
  });
});
