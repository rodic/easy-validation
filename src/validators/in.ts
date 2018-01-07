import { isIn as inArray } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export type InOption = string[];

export const isIn: ValidatorWithOption<InOption>
  = option => val => unlessNull(val, value => inArray(value, option));
