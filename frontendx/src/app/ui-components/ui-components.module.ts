import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbButtonsModule } from './buttons/buttons.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbButtonsModule
  ],
  exports:[NgbButtonsModule]
})
export class UiComponentsModule { }
