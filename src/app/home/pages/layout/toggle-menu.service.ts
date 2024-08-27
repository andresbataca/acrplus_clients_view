import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  private _isOpen = false;

  get getToogle(): boolean {
    return this._isOpen;
  }

  set setToogle(item:any) {
      this._isOpen = item
  }

  toggleMenu(): void {
    this._isOpen = !this._isOpen;
  }
}
