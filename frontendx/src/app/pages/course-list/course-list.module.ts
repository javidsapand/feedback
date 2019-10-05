import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { CourseListComponent } from './course-list.component';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseListComponent
      }
    ])
  ],

  declarations: [CourseListComponent]
})
export class CourseListModule { }
