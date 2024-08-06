import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import ptBr from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

registerLocaleData(ptBr)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
};
