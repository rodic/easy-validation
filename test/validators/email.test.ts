import { expect } from "../helpers";

import * as E from "../../src/validators/email";

describe("Validators.Email", function() {
  describe("isEmail", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          E.isEmail()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and is not email", function() {
        it("returns false", function() {
          expect(
            E.isEmail()("a")
          ).to.be.eql(false);
        });
      });

      context("and is email", function() {
        it("returns true", function() {
          expect(
            E.isEmail()("a@a.com")
          ).to.be.eql(true);
        });
      });
    });
  });

  describe("areEmails", function() {
    context("when value is missing", function() {
      it("returns true", function() {
        expect(
          E.areEmails()(undefined)
        ).to.be.eql(true);
      });
    });

    context("when value is present", function() {
      context("and it has values that are not emails", function() {
        it("returns false", function() {
          expect(
            E.areEmails()(["a@a.com", "", "b@b.com"])
          ).to.be.eql(false);
        });
      });

      context("and has only emails", function() {
        it("returns true", function() {
          expect(
            E.areEmails()(["a@a.com", "b@b.com", "c@c.com"])
          ).to.be.eql(true);
        });
      });
    });
  });
});
