import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() { }

  myArray = signal<any>({
    viewTool:false,
    title:'',
    icon:'',
    message:'',
    onMethod:() =>{}
  });

  public getArray(): any {
    return {...this.myArray()};
  }

  public setArray(newArray: any) {
    this.myArray.set(newArray);
  }

  public updateArrayElement(key: string, data: any) {
    this.myArray.update((val) => {
      return {
        ...val,
        [key]: data,
      };
    });
  }

  public closeTooltip() {
    this.myArray.update(currentValue => {
      return {
        ...currentValue,
        viewTool: false
      };
    })
  }

}
