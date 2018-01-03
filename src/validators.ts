import * as Promise from "bluebird";

import * as blankValidator from "./validators/blank";
import * as emailValidator from "./validators/email";
import * as lengthValidator from "./validators/length";
import * as nullValidator from "./validators/null";
import * as numericValidator from "./validators/numeric";

export type ValidatorWithOption<T>
  = (option?: T) => Validator;

export interface Validator {
  (value: string): boolean | Promise<boolean>;
  (value: string[]): boolean | Promise<boolean>;
}

export interface UnlessNull {
  (value: string, fn: Validator): boolean | Promise<boolean>;
  (value: string[], fn: Validator): boolean | Promise<boolean>;
}

export const unlessNull: UnlessNull = (val, fn) => {
  if (val === null || val === undefined) {
    return true;
  }
  return fn(val);
};

export const areEmails: ValidatorWithOption<undefined>
  = emailValidator.areEmails;

export const areNumerics: ValidatorWithOption<undefined>
  = numericValidator.areNumerics;

export const hasLengthOf: ValidatorWithOption<lengthValidator.LengthOption>
  = lengthValidator.hasLengthOf;

export const hasNotBlanks: ValidatorWithOption<undefined>
  = blankValidator.hasNotBlanks;

export const haveLengthsOf: ValidatorWithOption<lengthValidator.LengthOption>
  = lengthValidator.haveLengthsOf;

export const isEmail: ValidatorWithOption<undefined>
  = emailValidator.isEmail;

export const isNotBlank: ValidatorWithOption<undefined>
  = blankValidator.isNotBlank;

export const isNotNull: ValidatorWithOption<undefined>
  = nullValidator.isNotNull;

export const isNotNumeric: ValidatorWithOption<undefined>
  = numericValidator.isNotNumeric;

export const isNumeric: ValidatorWithOption<undefined>
  = numericValidator.isNumeric;
