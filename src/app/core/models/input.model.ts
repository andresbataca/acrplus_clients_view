export interface inputModel {
  tooltip:boolean;
  icon: string;
  labelExists: boolean;
  iconExists: boolean;
  width?: string;
  readonly?: boolean;
  decimal?: boolean;
  name:string;
  placeholder: string;
  controlName: string;
  isEyeChange:boolean;
  type:string;
  idIconDate?:string;
  font?:string
  errorIcon: boolean;
  passwordTwo?: boolean;
  validationSpecial: boolean
  validations: validationsItems[];
}

export interface validationsItems {
  validErrors: string;
  descriptErrors?: string;
}

