import { ValidatorWithOption, isNull } from "../validators";

export const isNotNull: ValidatorWithOption<undefined>
  = _option => val => !isNull(val);
