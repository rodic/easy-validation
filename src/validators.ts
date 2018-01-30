import * as Promise from "bluebird";

import * as blankValidator from "./validators/blank";
import * as containsValidator from "./validators/contains";
import * as dateValidator from "./validators/date";
import * as emailValidator from "./validators/email";
import * as equalsValidator from "./validators/equals";
import * as inValidator from "./validators/in";
import * as lengthValidator from "./validators/length";
import * as nullValidator from "./validators/null";
import * as numbersValidator from "./validators/numbers";
import * as numericValidator from "./validators/numeric";

export type ValidatorWithOption<T>
  = (option?: T) => Validator;

export type PBool = boolean | Promise<boolean>;

export interface Validator {
  (value: string): PBool;
  (value: string[]): PBool;
}

export interface UnlessNull {
  (value: string, fn: Validator): PBool;
  (value: string[], fn: Validator): PBool;
}

export const isNull = val => val === null || val === undefined;

export const unlessNull: UnlessNull = (val, fn) => {
  if (isNull(val)) {
    return true;
  }
  return fn(val);
};

export const areEmails: ValidatorWithOption<undefined>
  = emailValidator.areEmails;

export const areNumerics: ValidatorWithOption<undefined>
  = numericValidator.areNumerics;

export const contains: ValidatorWithOption<containsValidator.ContainsOption>
  = containsValidator.contains;

export const equals: ValidatorWithOption<equalsValidator.EqualsOption>
  = equalsValidator.equals;

export const hasLengthOf: ValidatorWithOption<lengthValidator.LengthOption>
  = lengthValidator.hasLengthOf;

export const hasLengthsOf: ValidatorWithOption<lengthValidator.LengthOption>
  = lengthValidator.hasLengthsOf;

export const hasNotBlanks: ValidatorWithOption<undefined>
  = blankValidator.hasNotBlanks;

export const isAfterDate: ValidatorWithOption<dateValidator.DateOption>
  = dateValidator.isAfterDate;

export const isAfterNow: ValidatorWithOption<undefined>
  = dateValidator.isAfterNow;

export const isBeforeDate: ValidatorWithOption<dateValidator.DateOption>
  = dateValidator.isBeforeDate;

export const isBeforeNow: ValidatorWithOption<undefined>
  = dateValidator.isBeforeNow;

export const isDate: ValidatorWithOption<undefined>
  = dateValidator.isDate;

export const isDateOnly: ValidatorWithOption<undefined>
  = dateValidator.isDateOnly;

export const isEmail: ValidatorWithOption<undefined>
  = emailValidator.isEmail;

export const isFloat: ValidatorWithOption<undefined>
  = numbersValidator.isFloat;

export const isIn: ValidatorWithOption<inValidator.InOption>
  = inValidator.isIn;

export const isInt: ValidatorWithOption<undefined>
  = numbersValidator.isInt;

export const isMax: ValidatorWithOption<numbersValidator.MinMaxOption>
  = numbersValidator.isMax;

export const isMin: ValidatorWithOption<numbersValidator.MinMaxOption>
  = numbersValidator.isMin;

export const isNotBlank: ValidatorWithOption<undefined>
  = blankValidator.isNotBlank;

export const isNotNull: ValidatorWithOption<undefined>
  = nullValidator.isNotNull;

export const isNotNumeric: ValidatorWithOption<undefined>
  = numericValidator.isNotNumeric;

export const isNumeric: ValidatorWithOption<undefined>
  = numericValidator.isNumeric;
