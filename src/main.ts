import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

  fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config) => {
    if (config.environment === "production") {
      enableProdMode();
      console.log('prod mode enabled');
    }

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  })