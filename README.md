# Easy Validation

A TypeScript library for string validation. The lib use a subset of [validator.js](https://github.com/chriso/validator.js) validators, but it can use any function that validates string or string array and returns boolean or boolean promise.

Example in plain JS.

```js
var validate = require("easy-validation").default;
var V = require ("easy-validation").V;

var invalidUser = {
  username: "uname",
  email: "u@example.com",
  phone: "1234-567"
};

var validUser = {
  username: "uname",
  email: "user@example.com",
  phone: "123456789"
}

function isUnique(username) {
  return Promise.resolve(username !== "u@example.com");
}

var validations = {
  username: [{
    validate: V.isNotBlank(),
    message: "username cannot be blank"
  }],
  email: [{
    validate: V.isNotNull(),
    message: "email cannot be null"
  }, {
    validate: isUnique,
    message: "email has been taken"
  }, {
    validate: V.isEmail(),
    message: "invalid email"
  }],
  phone: [{
    validate: V.hasLengthOf({ min: 9, max: 9 }),
    message: "phone must have nine digits"
  }, {
    validate: V.isNumeric(),
    message: "phone must contain only digits"
  }]
};

validate(invalidUser, validations)
  .catch(err => console.log(err.errors));

// { username: { errorMessage: '', errorMessages: [], hasError: false }
//   email:
//    { errorMessage: 'email has been taken',
//      errorMessages: [ 'email has been taken' ],
//      hasError: true },
//   phone:
//    { errorMessage: 'phone must have nine digits. phone must contain only digits',
//      errorMessages:
//       [ 'phone must have nine digits',
//         'phone must contain only digits' ],
//      hasError: true } }

validate(validUser, validations)
  .then(console.log);

// { username: 'uname',
//   email: 'user@example.com',
//   phone: '123456789' }
```

[Bigger example](test/validate.test.ts) can be found in tests
