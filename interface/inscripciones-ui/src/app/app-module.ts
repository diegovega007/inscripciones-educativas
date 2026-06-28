import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ResumenModule } from './modules/resumen/resumen-module';
import { AlumnosModule } from './modules/alumnos/alumnos-module';
import { RegistroModule } from './modules/registro/registro-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    ResumenModule,
    AlumnosModule,
    RegistroModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
