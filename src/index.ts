import validate, { Validations, ValidationObject } from "./validate";
import * as validators from "./validators";

export default validate;
export * from "./errors";
export { Validator } from "./validators";
export { ValidationObject, Validations };

export const V = validators;
