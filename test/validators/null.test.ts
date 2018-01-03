import { expect } from "../helpers";

import { isNotNull } from "../../src/validators/null";

describe("Validators.Null", function() {
  describe("notNull", function() {
    context("when value is missing", function() {
      it("returns false", function() {
        expect(
          isNotNull()(undefined)
        ).to.be.eql(false);
      });
    });

    context("when value is present", function() {
      context("and is not null", function() {
        context("and is falsey", function() {
          it("returns true", function() {
            expect(
              isNotNull()("")
            ).to.be.eql(true);
          });
        });

        context("and is not falsey", function() {
          it("returns true", function() {
            expect(
              isNotNull()("a")
            ).to.be.eql(true);
          });
        });
      });
    });
  });
});
