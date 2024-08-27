import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  viewloader = signal<boolean>(false);

  constructor() {}

  public getloader():boolean {
    return this.viewloader();
  }

  public setLoader(newArray:boolean) {
    this.viewloader.set(newArray);
  }

}
