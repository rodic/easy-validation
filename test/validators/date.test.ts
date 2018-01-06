import { expect } from "../helpers";

import * as D from "../../src/validators/date";
import { ValidatorError } from "../../src/errors";

const twoSecsFromNow = new Date(
  new Date().getTime() + 2000
).toString();

const twoSecsBeforeNow = new Date(
  new Date().getTime() - 2000
).toString();

describe("Validators.Date", function() {
  describe("isDate", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          D.isDate()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and is not date", function() {
        it("returns false", function() {
          expect(
            D.isDate()("invalid")
          ).to.be.eql(false);
        });
      });

      context("and is date only", function() {
        it("returns true", function() {
          expect(
            D.isDate()("2018-01-06")
          ).to.be.eql(true);
        });
      });

      context("and is datetime", function() {
        it("returns true", function() {
          expect(
            D.isDate()("2018-01-06T15:54:22+00:00")
          ).to.be.eql(true);
        });
      });
    });
  });

  describe("isDateOnly", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          D.isDateOnly()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and is not date", function() {
        it("returns false", function() {
          expect(
            D.isDateOnly()("invalid")
          ).to.be.eql(false);
        });
      });

      context("and is date only", function() {
        it("returns true", function() {
          expect(
            D.isDateOnly()("2018-01-06")
          ).to.be.eql(true);
        });
      });

      context("and is datetime", function() {
        it("returns true", function() {
          expect(
            D.isDateOnly()("2018-01-06T15:54:22+00:00")
          ).to.be.eql(false);
        });
      });
    });
  });

  describe("isAfter", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        return expect(
          D.isAfterDate("01/01/2018")(undefined)
        ).to.become(true);
      });
    });

    context("when value is present", function() {
      context("and option is not date", function() {
        return expect(
          D.isAfterDate("invalid")("01/01/2018")
        ).to.be.rejectedWith(ValidatorError, "Invalid date option: invalid");
      });

      context("and option is date", function() {
        context("and value is not date", function() {
          return expect(
            D.isAfterDate("01/01/2018")("invalid")
          ).to.become(false);
        });

        context("and value is date", function() {
          context("and is not after", function() {
            it("returns false", function() {
              return expect(
                D.isAfterDate("01/01/2018")("01/01/2018")
              ).to.become(false);
            });
          });

          context("and is after", function() {
            it("returns true", function() {
              return expect(
                D.isAfterDate("12/31/2017")("01/01/2018")
              ).to.become(true);
            });
          });
        });
      });
    });
  });

  describe("isAfterNow", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        return expect(
          D.isAfterNow()(undefined)
        ).to.become(true);
      });
    });

    context("when value is present", function() {
      context("and value is not date", function() {
        return expect(
          D.isAfterNow()("invalid")
        ).to.become(false);
      });

      context("and value is date", function() {
        context("and is not after", function() {
          it("returns false", function() {
            return expect(
              D.isAfterNow()(twoSecsBeforeNow)
            ).to.become(false);
          });
        });

        context("and is after", function() {
          it("returns true", function() {
            return expect(
              D.isAfterNow()(twoSecsFromNow)
            ).to.become(true);
          });
        });
      });
    });
  });

  describe("isBefore", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        return expect(
          D.isBeforeDate("01/01/2018")(undefined)
        ).to.become(true);
      });
    });

    context("when value is present", function() {
      context("and option is not date", function() {
        return expect(
          D.isBeforeDate("invalid")("01/01/2018")
        ).to.be.rejectedWith(ValidatorError, "Invalid date option: invalid");
      });

      context("and option is date", function() {
        context("and value is not date", function() {
          return expect(
            D.isBeforeDate("01/01/2018")("invalid")
          ).to.become(false);
        });

        context("and value is date", function() {
          context("and is not before", function() {
            it("returns false", function() {
              return expect(
                D.isBeforeDate("01/01/2018")("01/01/2018")
              ).to.become(false);
            });
          });

          context("and is before", function() {
            it("returns true", function() {
              return expect(
                D.isBeforeDate("01/01/2018")("12/31/2017")
              ).to.become(true);
            });
          });
        });
      });
    });
  });

  describe("isBeforeNow", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        return expect(
          D.isBeforeNow()(undefined)
        ).to.become(true);
      });
    });

    context("when value is present", function() {
      context("and value is not date", function() {
        return expect(
          D.isBeforeNow()("invalid")
        ).to.become(false);
      });

      context("and value is date", function() {
        context("and is not before", function() {
          it("returns false", function() {
            return expect(
              D.isBeforeNow()(twoSecsFromNow)
            ).to.become(false);
          });
        });

        context("and is before", function() {
          it("returns true", function() {
            return expect(
              D.isBeforeNow()(twoSecsBeforeNow)
            ).to.become(true);
          });
        });
      });
    });
  });
});
