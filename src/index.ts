import validate, { Validations, ValidationObject } from "./validate";
import * as validators from "./validators";

export * from "./errors";
export default validate;
export { Validator } from "./validators";
export { ValidationObject, Validations }
export const V = validators;
