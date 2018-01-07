# Easy Validation

[![Build Status](https://travis-ci.org/rodic/easy-validation.svg?branch=master)](https://travis-ci.org/rodic/easy-validation) [![Known Vulnerabilities](https://snyk.io/test/github/rodic/easy-validation/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rodic/easy-validation?targetFile=package.json)

A TypeScript validation library. The lib use a subset of [validator.js](https://github.com/chriso/validator.js) validators, but it can use any function that validates string or string array and returns boolean or boolean promise.

## Installation

```
npm install easy-validation
```

## Usage

```ts
import * as Promise from "bluebird";
import validate, {
  V,
  ValidationError,
  ValidationObject,
  Validations,
  Validator
} from "easy-validation";

const invalidUser: ValidationObject = {
  username: "uname",
  email: "u@example.com",
  phone: "1234-567"
};

const validUser: ValidationObject = {
  username: "uname",
  email: "user@example.com",
  phone: "123456789"
};

const isUnique: Validator = email => {
  return Promise.resolve(email !== "u@example.com");
};

const validations: Validations = {
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
  .catch(ValidationError, err => console.log(err.errors));

// { username: { errorMessage: '', errorMessages: [], hasError: false },
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

Expanded example that includes nested properties and array of objects can be found in [tests](test/validate.test.ts)

## Validators

All validators except `isNotNull` treat properties as optional. That is they validate `null` and `undefined`.

### areEmails

```ts
areEmails()
```

Fails if list contains anything but valid emails.

### areNumerics

```ts
areNumerics()
```

Fails if list contains anything but numeric values.

### contains

```ts
contains(str)
```

Fails if property does not contain given `str`.

### equals

```ts
equals(str)
```

Fails if property is not equal to the given `str`.

### hasLengthOf

```ts
interface LengthOption {
  min?: number;
  max?: number;
}

hasLengthOf(option)
```

Fails if property does not have length between min and max.

Valid options are `{ min: m }` and `{ max: m }` as well.

If both values are omitted string is considered valid.

### hasLengthsOf

```ts
interface LengthOption {
  min?: number;
  max?: number;
}

hasLengthsOf(option)
```

Fails if any value in the list does not match length criteria.

Valid options are `{ min: m }` and `{ max: m }` as well.

If both values are omitted all strings in the list are considered valid.

### hasNotBlanks

```ts
hasNotBlanks()
```

Fails if list contains empty string.

### isAfterDate

```ts
isAfterDate(datetime)
```

Fails if property is not valid date or not after `datetime` param.

If date param is not valid date or datetime string validation fails with `ValidatorError`.


### isAfterNow

```ts
isAfterNow()
```

Fails if property is not valid date or not after current datetime.

### isBeforeDate

```ts
isBeforeDate(datetime)
```

Fails if property is not valid date or not before `datetime` param.

If date param is not valid date or datetime string validation fails with `ValidatorError`.


### isBeforeNow

```ts
isBeforeNow()
```

Fails if property is not valid date or not before current datetime.

### isDate

```ts
isDate()
```

Fails if property is not [parsable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) date string.


### isDateOnly

```ts
isDateOnly()
```
Fails if property is not [parasble](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) date or if it contains any component but `mm` `dd` and `yyyy`.

### isEmail

```ts
isEmail()
```

Fails if property is not valid email.

### IsFloat

```ts
isFloat()
```

Fails if property is not number.

### isIn

```ts
isIn(arr)
```

Fails if property is not memeber of the given `arr`.


### isInt

```ts
isInt()
```

Fails if property is not an integer

### isMax

```ts
isMax(num)
```

Fails if property is not number or is greater than given `num`.

### isMin

```ts
isMin(num)
```

Fails if property is not number or is less than the given `num`.

### isNotBlank

```ts
isNotBlank()
```

Fails if property is empty string.


### isNotNull

```ts
isNotNull()
```

Fails if property is `null` or `undefined`.

### isNotNumeric

```ts
isNotNumeric()
```

Fails if property is numeric.

### isNumeric

```ts
isNumeric()
```

Fails if property is not numeric.
