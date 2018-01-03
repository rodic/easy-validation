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
  [key: string]: ValidatorOption;
}

export type ValidatorOption
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
  rules: Validations
): Promise<ValidationObject> {
  return validate(obj, rules).then(validationObject => {
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
  validators: Validations
): Promise<ValidationResult> {
  return Promise.reduce<string, ValidationResult>(
    Object.keys(validators),
    (validationResult, property) => {
      if (areArrayValidations(validators[property])) {
        const values = obj[property] as ValidationObject[];
        const arrayRule = validators[property][0][0] as Validations;

        return mapValidation(property, values, arrayRule, validationResult);
      }
      if (arePropertyValidations(validators[property])) {
        const value = obj[property] as string;
        const validations = validators[property] as PropertyValidation[];

        return validateValue(value, validations).then(errors => {
          return addErrors(property, errors, validationResult);
        });
      }

      const nestedObject = obj[property] as ValidationObject;
      const nestedRules = validators[property] as Validations;

      return validate(nestedObject, nestedRules)
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
  rules: ValidatorOption
): boolean {
  return rules instanceof Array && rules[0] instanceof Array;
}

function arePropertyValidations(
  rules: ValidatorOption
): boolean {
  return rules instanceof Array;
}

function mapValidation(
  property: string,
  values: ValidationObject[],
  rules: Validations,
  validationObject: ValidationResult
): Promise<ValidationResult> {
  return Promise.reduce<ValidationObject, ValidationResult[]>(
    values,
    (accum, value) => {
      return validate(value, rules).then(result => [...accum, result]);
    },
    []
  ).then(newValidationObject => {
    return addProperty(validationObject, property, newValidationObject);
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
