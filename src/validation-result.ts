import * as Promise from "bluebird";

import { ValidatorError } from "./errors";

export interface ValidationResult {
  [prop: string]: ValidationValue;
}

export type ValidationValue
  = ValidationEntry
  | ValidationResult
  | ValidationResult[];

export interface ValidationEntry {
  errorMessage: string;
  errorMessages: string[];
  hasError: boolean;
}

const nullEntry: ValidationEntry = {
  errorMessage: "",
  errorMessages: [],
  hasError: false
};

export function addErrors(
  property: string,
  errors: string[],
  validationResult: ValidationResult
): Promise<ValidationResult> {
  return getValidationEntry(validationResult[property]).then(entry => {
    const hasError = entry.hasError || errors.length > 0;
    const updatedErrors = [...entry.errorMessages, ...errors];
    return {
      ...validationResult,
      [property]: {
        errorMessage: updatedErrors.join(". "),
        errorMessages: updatedErrors,
        hasError
      }
    };
  });
}

export function addProperty(
  validationResult: ValidationResult,
  property: string,
  nestedObject: ValidationValue
): ValidationResult {
  return {
    ...validationResult,
    [property]: nestedObject
  };
}

function getValidationEntry(
  validationValue: ValidationValue,
): Promise<ValidationEntry> {
  return new Promise<ValidationEntry>((resolve, reject) => {
    if (validationValue && isValidationEntry(validationValue)) {
      return resolve(validationValue);
    }
    if (!validationValue) {
      return resolve(nullEntry);
    }
    return reject(
      new ValidatorError(
        `Invalid error entry ${JSON.stringify(validationValue)}`
      )
    );
  });
}

export function hasErrors(errorObj: ValidationResult): boolean {
  return Object.keys(errorObj).some(prop => {
    const err = errorObj[prop];
    if (areValidationResults(err)) {
      return err.some(hasErrors);
    }
    if (isValidationEntry(err)) {
      return err.hasError;
    }
    return hasErrors(err);
  });
}

function areValidationResults(
  validationValue: ValidationValue
): validationValue is ValidationResult[] {
  return validationValue instanceof Array;
}

function isValidationEntry(
  validationValue: ValidationValue
): validationValue is ValidationEntry {
  return "hasError" in validationValue && "errorMessages" in validationValue;
}
