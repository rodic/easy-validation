import * as Promise from "bluebird";

import {
  addErrors,
  addProperty,
  hasErrors,
  ValidationResult
} from "./validation-result";
import { ValidationError } from "./errors";
import { Validator } from "./validators";

export interface Validations {
  [key: string]: ValidationOption;
}

export type ValidationOption
  = PropertyValidations
  | ArrayValidations
  | Validations;

export type PropertyValidations = PropertyValidation[];
export type ArrayValidations = Validations[][];

export interface PropertyValidation {
  validate: Validator;
  message: string;
}

export interface ValidationObject {
  [key: string]: ValidationValue;
}

export type ValidationValue
  = string
  | string[]
  | ValidationObject
  | ValidationObject[];

export default function(
  obj: ValidationObject,
  validations: Validations
): Promise<ValidationObject> {
  return validate(obj, validations).then(validationObject => {
    return new Promise((resolve, reject) => {
      if (hasErrors(validationObject)) {
        return reject(
          new ValidationError("Validation failed", validationObject)
        );
      }
      return resolve(obj);
    });
  });
}

function validate(
  obj: ValidationObject,
  validations: Validations
): Promise<ValidationResult> {
  return Promise.reduce<string, ValidationResult>(
    Object.keys(validations),
    (validationResult, property) => {
      const valOption: ValidationOption = validations[property];

      if (areArrayValidations(valOption)) {
        const values = obj[property] as ValidationObject[];
        const arrayVals = valOption[0][0];

        return mapValidation(property, values, arrayVals, validationResult);
      }

      if (arePropertyValidations(valOption)) {
        const value = obj[property] as string;

        return validateValue(value, valOption).then(errors => {
          return addErrors(property, errors, validationResult);
        });
      }

      const nestedObject = obj[property] as ValidationObject;

      return validate(nestedObject, valOption)
        .then(nestedValidationResult => {
          return addProperty(
            validationResult,
            property,
            nestedValidationResult
          );
        });
    },
    {}
  );
}

function areArrayValidations(
  valOption: ValidationOption
): valOption is ArrayValidations {
  return valOption instanceof Array && valOption[0] instanceof Array;
}

function arePropertyValidations(
  valOption: ValidationOption
): valOption is PropertyValidations {
  return valOption instanceof Array;
}

function mapValidation(
  property: string,
  values: ValidationObject[],
  validations: Validations,
  validationResult: ValidationResult
): Promise<ValidationResult> {
  return Promise.reduce<ValidationObject, ValidationResult[]>(
    values,
    (accum, value) => {
      return validate(value, validations).then(result => [...accum, result]);
    },
    []
  ).then(validationResults => {
    return addProperty(validationResult, property, validationResults);
  });
}

function validateValue(
  value: string,
  validations: PropertyValidation[],
): Promise<string[]> {
  return Promise.reduce(
    validations,
    (errors: string[], validation: PropertyValidation) => {
      return Promise.resolve(validation.validate(value))
        .then(valid => {
          if (valid) {
            return errors;
          }
          return [...errors, validation.message];
        });
    },
    []
  );
}
