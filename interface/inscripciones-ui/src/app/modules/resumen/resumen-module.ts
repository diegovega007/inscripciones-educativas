import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenComponent } from './components/resumen/resumen-component';

@NgModule({
  declarations: [ResumenComponent],
  imports: [CommonModule],
  exports: [ResumenComponent]
})
export class ResumenModule {}
