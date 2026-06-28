import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro';

@NgModule({
  declarations: [RegistroComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegistroComponent]
})
export class RegistroModule {}
