import { expect } from "../helpers";

import * as I from "../../src/validators/numbers";

describe("Validators.Numbers", function() {
  describe("isInt", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          I.isInt()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and string is not number", function() {
        it("returns false", function() {
          expect(
            I.isInt()("a23")
          ).to.be.eql(false);
        });
      });

      context("and string is int", function() {
        it("returns true", function() {
          expect(
            I.isInt()("123")
          ).to.be.eql(true);
        });
      });

      context("and string is float", function() {
        it("returns false", function() {
          expect(
            I.isInt()("3.1415")
          ).to.be.eql(false);
        });
      });
    });
  });

  describe("isFloat", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          I.isFloat()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and string is not number", function() {
        it("returns false", function() {
          expect(
            I.isFloat()("a23")
          ).to.be.eql(false);
        });
      });

      context("and string is int", function() {
        it("returns true", function() {
          expect(
            I.isFloat()("123")
          ).to.be.eql(true);
        });
      });

      context("and string is float", function() {
        it("returns false", function() {
          expect(
            I.isFloat()("3.1415")
          ).to.be.eql(true);
        });
      });
    });
  });

  describe("isMin", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          I.isMin(3)(undefined)
        ).to.be.eql(true);
      });
    });

    context("and value is present", function() {
      context("and value is not number", function() {
        it("returns false", function() {
          expect(
            I.isMin(3)("NaN")
          ).to.be.eql(false);
        });
      });

      context("and value is number", function() {
        context("and is less than min", function() {
          it("returns false", function() {
            expect(
              I.isMin(3)("2")
            ).to.be.eql(false);
          });
        });

        context("and is exactly min", function() {
          it("returns true", function() {
            expect(
              I.isMin(3)("3")
            ).to.be.eql(true);
          });
        });

        context("and is greater than min", function() {
          it("returns true", function() {
            expect(
              I.isMin(3)("4")
            ).to.be.eql(true);
          });
        });
      });
    });
  });

  describe("isMax", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          I.isMax(3)(undefined)
        ).to.be.eql(true);
      });
    });

    context("and value is present", function() {
      context("and value is not number", function() {
        it("returns false", function() {
          expect(
            I.isMax(3)("NaN")
          ).to.be.eql(false);
        });
      });

      context("and value is number", function() {
        context("and is less than max", function() {
          it("returns true", function() {
            expect(
              I.isMax(3)("2")
            ).to.be.eql(true);
          });
        });

        context("and is exactly max", function() {
          it("returns true", function() {
            expect(
              I.isMax(3)("3")
            ).to.be.eql(true);
          });
        });

        context("and is greater than max", function() {
          it("returns false", function() {
            expect(
              I.isMax(3)("4")
            ).to.be.eql(false);
          });
        });
      });
    });
  });
});
