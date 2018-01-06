import { isLength } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export interface LengthOption {
  min?: number;
  max?: number;
}

export const hasLengthOf: ValidatorWithOption<LengthOption>
  = option => val => unlessNull(val, value => isLength(value, option));

export const hasLengthsOf: ValidatorWithOption<LengthOption>
  = option => vals => unlessNull(
    vals,
    values => values.every(val => hasLengthOf(option)(val))
  );
