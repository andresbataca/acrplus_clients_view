export interface selectModel {
  tooltip?:boolean;
  icon: string;
  labelExists: boolean;
  iconExists: boolean;
  width?:string;
  font?:string
  name: string;
  placeholder: string;
  controlName: string;
  selects: selectItems[];

}

export interface selectItems {
  value: number | string;
  name: string;
}

