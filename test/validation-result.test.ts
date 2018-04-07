import { expect } from "./helpers";

import {
  ValidationResult,
  addErrors,
  hasErrors
} from "../src/validation-result";
import { ValidatorError } from "../src/errors";

const errorObject: ValidationResult = {
  a: {
    errorMessages: ["error 1"],
    hasError: true
  },
  b: {
    errorMessages: ["error 1"],
    hasError: true
  },
  c: {
    errorMessages: [],
    hasError: false
  }
};

describe("ValidationResult", function() {
  describe("addErrors", function() {
    context("when is called with errors", function() {
      context("and errorObject is empty", function() {
        it("adds the errors", function() {
          return expect(
            addErrors("a", ["error 1"], {})
          ).to.become({
            a: {
              errorMessages: ["error 1"],
              hasError: true
            }
          });
        });
      });

      context("and errorObject is not empty", function() {
        context("and property is taken by object", function() {
          it("adds the errors", function() {
            return expect(
              addErrors("a", ["error 2"], {
                a: {
                  b: {
                    errorMessages: [],
                    hasError: false
                  }
                }
              })
            ).to.be.rejectedWith(
              ValidatorError,
              "Invalid error entry");
          });
        });

        context("and property is taken by entry", function() {
          it("adds the errors", function() {
            return expect(
              addErrors("a", ["error 2"], errorObject)
            ).to.become({
              ...errorObject,
              a: {
                errorMessages: ["error 1", "error 2"],
                hasError: true
              }
            });
          });
        });
      });
    });

    context("when is called without errors", function() {
      context("and errorObject is empty", function() {
        it("returns empty errorObject", function() {
          return expect(
            addErrors("a", [], {})
          ).to.become({
            a: {
              errorMessages: [],
              hasError: false
            }
          });
        });
      });

      context("end errorObject is not empty", function() {
        it("returns original errorObject", function() {
          return expect(
            addErrors("a", [], errorObject)
          ).to.become(errorObject);
        });
      });
    });
  });

  describe("hasErrors", function() {
    context("when error object is empty", function() {
      it("returns false", function() {
        return expect(
          hasErrors({})
        ).to.be.eql(false);
      });
    });

    context("when there are no entries with error", function() {
      it("returns false", function() {
        return expect(
          hasErrors({
            a: {
              errorMessages: [],
              hasError: false
            },
            b: {
              c: {
                errorMessages: [],
                hasError: false
              }
            }
          })
        ).to.be.eql(false);
      });
    });

    context("when there are top level entries with error", function() {
      it("returns true", function() {
        expect(
          hasErrors({
            a: {
              errorMessages: ["error"],
              hasError: true
            },
            b: {
              c: {
                errorMessages: [],
                hasError: false
              }
            }
          })
        ).to.be.eql(true);
      });
    });

    context("when there are nested entries with error", function() {
      it("returns true", function() {
        expect(
          hasErrors({
            a: {
              errorMessages: [],
              hasError: false
            },
            b: {
              c: {
                errorMessages: ["error"],
                hasError: true
              }
            }
          })
        ).to.be.eql(true);
      });
    });

    context("when there is an array with error", function() {
      it("returns true", function() {
        expect(
          hasErrors({
            a: {
              errorMessages: [],
              hasError: false
            },
            b: {
              c: [{
                d0: {
                  e: {
                    errorMessages: [],
                    hasError: false
                  },
                  f: {
                    errorMessages: [],
                    hasError: false
                  }
                },
                d1: {
                  e: {
                    errorMessages: [],
                    hasError: false
                  },
                  f: {
                    errorMessages: ["error"],
                    hasError: true
                  }
                }
              }]
            }
          })
        ).to.be.eql(true);
      });
    });
  });
});
