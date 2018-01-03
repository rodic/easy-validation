import { ValidatorWithOption } from "../validators";

export const isNotNull: ValidatorWithOption<undefined>
  = _option => val => val !== null && val !== undefined;
