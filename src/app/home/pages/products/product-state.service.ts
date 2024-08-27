import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {

  #prodState = signal<string>('inicio');

  public getData(): any {
    return this.#prodState() ;
  }

  public setData(newArray: any) {
    this.#prodState.set(newArray);
  }
  
}
