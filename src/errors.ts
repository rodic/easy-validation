import { ValidationResult } from "./validation-result";

export class ValidationError extends Error {
  public errors: ValidationResult;

  constructor(message: string, errorObject: ValidationResult = {}) {
    super(message);
    this.errors = errorObject;
  }
}

export class ValidatorError extends Error { }
