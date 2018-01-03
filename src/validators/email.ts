import { isEmail as email } from "validator";
import { unlessNull, ValidatorWithOption } from "../validators";

export const isEmail: ValidatorWithOption<undefined>
  = _option => val => unlessNull(val, value => email(value));

export const areEmails: ValidatorWithOption<undefined>
  = _option => vals => unlessNull(
    vals,
    values => values.every(val => isEmail()(val))
  );
