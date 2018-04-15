import { isEmpty } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export const isNotBlank: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => !isEmpty(value));
