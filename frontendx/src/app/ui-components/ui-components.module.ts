import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbButtonsModule } from './buttons/buttons.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NgbButtonsModule
  ],
  exports:[NgbButtonsModule]
})
export class UiComponentsModule { }
