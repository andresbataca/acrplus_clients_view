import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #darkMode = signal(false);

  get getIsDarkMode() {
    return this.#darkMode();
  }

  set setIsDarkMode(value: boolean) {
    this.#darkMode.set(value);
  }

  constructor() {}

  public toggleTheme() {
    const isDarkMode = !this.#darkMode();

    document.body.classList.remove(isDarkMode ? 'light' : 'dark');
    document.body.classList.add(isDarkMode ? 'dark' : 'light');

    this.#darkMode.update(prevValue => !prevValue);

    this.saveTheme(isDarkMode);
  }

  private saveTheme(status:boolean) {
    localStorage.setItem('theme', JSON.stringify(status) );
  }

  public getThemeLocalStorage(){
    const storedTheme = localStorage.getItem('theme');
    const themeStatus = storedTheme ? JSON.parse(storedTheme) : null;
    return themeStatus;
  }

  public getDeviceMode(){
    const deviceMode = window.matchMedia("(prefers-color-scheme: dark)");
    return deviceMode.matches;
  }

  public themeLoadInAppComponent() {
    const status = this.getThemeLocalStorage() ?? this.getDeviceMode();
    document.body.classList.add(status ? 'dark' : 'light');
    this.setIsDarkMode = status;
  }
}
