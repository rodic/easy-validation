import { isNumeric as numeric } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export const isNumeric: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => numeric(value));

export const isNotNumeric: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => !isNumeric()(value));

export const areNumerics: ValidatorWithOption<undefined>
  = _option => vals => unlessNull(
    vals,
    values => values.every(val => isNumeric()(val))
  );
