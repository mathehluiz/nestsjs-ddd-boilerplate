export interface FieldErrors {
  [field: string]: string[];
}

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}
