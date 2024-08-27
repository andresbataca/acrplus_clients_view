import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeStateService {

  #homeState = signal<string>('inicio');

  public getData(): any {
    return this.#homeState() ;
  }

  public setData(newArray: any) {
    this.#homeState.set(newArray);
  }

}
