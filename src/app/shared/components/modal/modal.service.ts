import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { modalModel } from '../../../core/models/modal.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() { }

  myArray = signal<modalModel>({
    viewModal: false,
    clickOutside: false,
    title: '',
    icon: '',
    message: '',
    onMethod: () => { },
    isThereaButton2: false,
    onMethodAction: () => { },
    loader: false,
    buttonText: '',
    buttonTextSecondary: ''
  });

  public getArray(): modalModel {
    return { ...this.myArray() };
  }

  public setArray(newArray: modalModel) {
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

  public updateArray(data: any) {
    // asi se usa para caso especiales this.modal.updateArray({viewModal:true,title:'me entendes'})
    this.myArray.update((currentValue) => {
      let updatedValue = { ...currentValue };
      updatedValue = data;
      return updatedValue;
    });
  }

  public closeModal() {
    this.myArray.update(currentValue => {
      return {
        ...currentValue,
        viewModal: false
      };
    })
  }

}
