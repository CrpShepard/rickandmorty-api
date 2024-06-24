import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { apolloOptionsFactory } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  /*providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(BrowserModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
      deps: [HttpLink],
    },
    provideClientHydration(), provideAnimationsAsync(), provideHttpClient(), graphqlProvider]*/

    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes, withComponentInputBinding()),
      importProvidersFrom(BrowserModule),
      provideClientHydration(),
      provideAnimationsAsync(),
      provideHttpClient(),
      graphqlProvider,
    ],
};
