export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableINput: Validatable) {
  let isValid = true;
  if (validatableINput.required) {
    isValid = isValid && validatableINput.value.toString().trim().length !== 0;
  }
  if (
    validatableINput.minLength != null &&
    typeof validatableINput.value === 'string'
  ) {
    isValid =
      isValid && validatableINput.value.length >= validatableINput.minLength;
  }
  if (
    validatableINput.min != null &&
    typeof validatableINput.value === 'number'
  ) {
    isValid = isValid && validatableINput.value >= validatableINput.min;
  }
  if (
    validatableINput.max != null &&
    typeof validatableINput.value === 'number'
  ) {
    isValid = isValid && validatableINput.value <= validatableINput.max;
  }
  return isValid;
}
