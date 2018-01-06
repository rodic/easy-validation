import { contains as cont } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export type ContainsOption = string;

export const contains: ValidatorWithOption<ContainsOption>
  = option => val => unlessNull(val, value => cont(value, option));
