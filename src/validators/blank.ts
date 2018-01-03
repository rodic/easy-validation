import { isEmpty } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export const isNotBlank: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => !isEmpty(value));

export const hasNotBlanks: ValidatorWithOption<undefined>
  = _option => vals => unlessNull(
    vals,
    values => values.every(val => isNotBlank()(val))
  );
