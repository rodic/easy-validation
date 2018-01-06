import * as Promise from "bluebird";
import { isAfter as after, isBefore as before } from "validator";
import { isNull, unlessNull, ValidatorWithOption } from "../validators";
import { ValidatorError } from "../errors";

export type DateOption = string;

const millisecondsInDay = 24 * 60 * 60 * 1000;

export const isDate: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => !isNaN(Date.parse(value)));

export const isDateOnly: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => {
    const date = Date.parse(value);
    return !isNaN(date) && date % millisecondsInDay === 0;
  });

export const isAfterDate: ValidatorWithOption<DateOption> = is(after);

export const isBeforeDate: ValidatorWithOption<DateOption> = is(before);

export const isAfterNow: ValidatorWithOption<undefined>
  = _option => val => isAfterDate(new Date().toString())(val);

export const isBeforeNow: ValidatorWithOption<undefined>
  = _option => val => isBeforeDate(new Date().toString())(val);

function is(
  compare: (date1: string, date2: string) => boolean
): ValidatorWithOption<DateOption> {
  return option => val => new Promise<boolean>((resolve, reject) => {
    const date = Date.parse(val);
    const dateOption = Date.parse(option);

    if (!isNull(val) && isNaN(date)) {
      return resolve(false);
    }

    if (!isNull(val) && isNaN(dateOption)) {
      return reject(new ValidatorError(`Invalid date option: ${option}`));
    }

    return resolve(
      unlessNull(val, value => compare(value, option))
    );
  });
}
