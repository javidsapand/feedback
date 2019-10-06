import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent} from './button/button';
import { ListComponent } from './list/list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortbyComponent } from './sortby/sortby.component';



@NgModule({
  declarations: [ListComponent, PaginatorComponent, SortbyComponent , ButtonComponent],
  imports: [
    CommonModule,
  ],
  exports: [ListComponent, PaginatorComponent, SortbyComponent , ButtonComponent],
})
export class UiComponentsModule { }
