import validate, { Validations, ValidationObject } from "./validate";
import * as validators from "./validators";
import * as Bluebird from "bluebird";

export default validate;
export * from "./errors";
export { Validator } from "./validators";
export { ValidationObject, Validations };

export const V = validators;
export const Promise = Bluebird;
