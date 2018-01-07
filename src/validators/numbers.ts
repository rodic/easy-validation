import { isInt as int, isFloat as float } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export type MinMaxOption = number;

export const isInt: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => int(value));

export const isFloat: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => float(value));

export const isMin: ValidatorWithOption<MinMaxOption>
  = is((m, n) => m >= n);

export const isMax: ValidatorWithOption<MinMaxOption>
  = is((m, n) => m <= n);

function is(
  comparator: (n: number, m: number) => boolean
): ValidatorWithOption<MinMaxOption> {
  return option => val => unlessNull(val, value => {
    const n = Number(value);
    return !isNaN(n) && comparator(n, option);
  });
}
