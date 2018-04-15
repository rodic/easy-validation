import * as Promise from "bluebird";

import { expect } from "./helpers";

import * as V from "../src/validators";
import validate, { Validations, ValidationObject } from "../src/validate";
import { ValidationError } from "../src/errors";
import { ValidationResult } from "../src/validation-result";

const validUser: ValidationObject = {
  id: "1",
  username: "hmess",
  personalData: {
    name: {
      first: "Hank",
      last: "Mess"
    },
    address: {
      street: {
        name: "Larkin Fork",
        number: "426"
      },
      city: "Imogeneborough",
      zipCode: "58517",
      apartmentNumber: "672"
    },
    phone: "123456789",
    email: "hmess@mess.com"
  },
  friends: [{
    id: "2",
    username: "fmess",
    displayName: "Frank Mess",
  }, {
    id: "3",
    username: "jmess",
    displayName: "Jane Mess",
  }]
};

const invalidUser: ValidationObject = {
  id: "0", // not positive int
  username: "mess", // username taken,
  personalData: {
    name: {
      first: "Hank",
      last: "" // cannot be blank
    },
    address: {
      street: {
        name: "Larkin Fork",
        number: "#426" // must be all digits
      },
      // city: "Imogeneborough", cannot be null, error
      // zipCode: "58517", can be null, no error
      apartmentNumber: "672"
    },
    phone: "1234-567", // must have nine digits exactly, no dashes
    email: "hmess" // invalid email
  },
  friends: [{
    id: "2",
    username: "fm", // must have at least three chars
    displayName: "Frank Mess",
  }, {
    // id: 3,  cannot be null or undefined
    username: "jmess",
    displayName: "Jane Mess",
  }]
};

// Custom async validator
const isUniqueInDB: V.Validator
  = username => Promise.resolve(username !== "mess");

const idValidation = [{
  validate: V.isNotNull(),
  message: "id cannot be null"
}, {
  validate: V.isNumeric(),
  message: "id must be a number"
}, {
  validate: V.isMin(1),
  message: "id must be a positive integer"
}];

const usernameValidation = [{
  validate: V.isNotNull(),
  message: "username cannot be null"
}, {
  validate: V.hasLengthOf({ min: 3 }),
  message: "username must be at least three chars long"
}, {
  validate: isUniqueInDB,
  message: "username has been taken"
}];

const userValidations: Validations = {
  id: idValidation,
  username: usernameValidation,
  personalData: {
    name: {
      first: [{
        validate: V.isNotNull(),
        message: "first name cannot be null"
      }, {
        validate: V.isNotBlank(),
        message: "first name cannot be blank"
      }],
      last: [{
        validate: V.isNotNull(),
        message: "last name cannot be null"
      }, {
        validate: V.isNotBlank(),
        message: "last name cannot be blank"
      }]
    },
    address: {
      street: {
        name: [{
          validate: V.isNotBlank(),
          message: "street name cannot be blank"
        }],
        number: [{
          validate: V.isNumeric(),
          message: "street number must be a number"
        }]
      },
      city: [{
        validate: V.isNotNull(),
        message: "city cannot be null"
      }, {
        validate: V.isNotBlank(),
        message: "city cannot be blank"
      }],
      zipCode: [{
        validate: V.isNumeric(),
        message: "street number must be a number"
      }],
      apartmentNumber: [{
        validate: V.isNumeric(),
        message: "street number must be a number"
      }]
    },
    phone: [{
      validate: V.isNumeric(),
      message: "phone number must contain only digits"
    }, {
      validate: V.hasLengthOf({ min: 9, max: 9 }),
      message: "phone number must have nine digits"
    }],
    email: [{
      validate: V.isEmail(),
      message: "invalid email"
    }]
  },
  friends: [[{
    id: idValidation,
    username: usernameValidation,
    displayName: [{
      validate: V.isNotBlank(),
      message: "display name cannot be blank"
    }]
  }]]
};

const noUserResult: ValidationResult = {
  id: {
    errorMessages: ["id cannot be null"],
    hasError: true
  },
  username: {
    errorMessages: ["username cannot be null"],
    hasError: true
  },
  personalData: {
    name: {
      first: {
        errorMessages: ["first name cannot be null"],
        hasError: true
      },
      last: {
        errorMessages: ["last name cannot be null"],
        hasError: true
      }
    },
    address: {
      street: {
        name: {
          errorMessages: [],
          hasError: false
        },
        number: {
          errorMessages: [],
          hasError: false
        }
      },
      city: {
        errorMessages: ["city cannot be null"],
        hasError: true
      },
      zipCode: {
        errorMessages: [],
        hasError: false
      },
      apartmentNumber: {
        errorMessages: [],
        hasError: false
      }
    },
    phone: {
      errorMessages: [],
      hasError: false
    },
    email: {
      errorMessages: [],
      hasError: false
    }
  },
  friends: []
};

const invalidUserResult: ValidationResult = {
  id: {
    errorMessages: ["id must be a positive integer"],
    hasError: true
  },
  username: {
    errorMessages: ["username has been taken"],
    hasError: true
  },
  personalData: {
    name: {
      first: {
        errorMessages: [],
        hasError: false
      },
      last: {
        errorMessages: ["last name cannot be blank"],
        hasError: true
      }
    },
    address: {
      street: {
        name: {
          errorMessages: [],
          hasError: false
        },
        number: {
          errorMessages: ["street number must be a number"],
          hasError: true
        }
      },
      city: {
        errorMessages: ["city cannot be null"],
        hasError: true
      },
      zipCode: {
        errorMessages: [],
        hasError: false
      },
      apartmentNumber: {
        errorMessages: [],
        hasError: false
      }
    },
    phone: {
      errorMessages: [
        "phone number must contain only digits",
        "phone number must have nine digits"
      ],
      hasError: true
    },
    email: {
      errorMessages: ["invalid email"],
      hasError: true
    }
  },
  friends: [
    {
      id: {
        errorMessages: [],
        hasError: false
      },
      username: {
        errorMessages: [
          "username must be at least three chars long"
        ],
        hasError: true
      },
      displayName: {
        errorMessages: [],
        hasError: false
      }
    },
    {
      id: {
        errorMessages: ["id cannot be null"],
        hasError: true
      },
      username: {
        errorMessages: [],
        hasError: false
      },
      displayName: {
        errorMessages: [],
        hasError: false
      }
    }
  ]
};

describe("Validate", function() {
  context("when there are no validations", function() {
    it("returns the input", function() {
      return expect(
        validate(invalidUser, {})
      ).to.become(invalidUser);
    });
  });

  context("when there are validations", function() {
    context("and there is no validation object", function() {
      it("returns all not null errors", function() {
        return expect(
          validate({}, userValidations)
        ).to.be.rejectedWith(ValidationError).then(error => {
          return expect(error)
            .to.have.property("errors").be.eql(noUserResult);
        });
      });
    });

    context("and there is validation object", function() {
      context("and is valid", function() {
        it("returns the input", function() {
          return expect(
            validate(validUser, userValidations)
          ).to.become(validUser);
        });
      });

      context("and is not valid", function() {
        it("returns correct errors", function() {
          return expect(
            validate(invalidUser, userValidations)
          ).to.be.rejectedWith(ValidationError).then(error => {
            return expect(error)
              .to.have.property("errors").be.eql(invalidUserResult);
          });
        });
      });
    });
  });
});
