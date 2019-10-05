import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPipe } from './select.pipe';



@NgModule({
  declarations: [SelectPipe],
  imports: [
    CommonModule
  ],
  exports: [SelectPipe]
})
export class PipesModule { }
