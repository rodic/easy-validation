import { equals as eq } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export type EqualsOption = string;

export const equals: ValidatorWithOption<EqualsOption>
  = option => val => unlessNull(val, value => eq(value, option));
