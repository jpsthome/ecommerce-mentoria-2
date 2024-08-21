import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private darkMode = signal(false);

  constructor() {
    effect(() => {
      if (this.darkMode()) {
        document.body.classList.add('color-theme__dark');
      } else {
        document.body.classList.remove('color-theme__dark');
      }
    });
  }

  isDarkMode() {
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode.set(isDarkMode);
  }
}
