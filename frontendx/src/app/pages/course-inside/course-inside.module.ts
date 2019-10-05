import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';



import { CourseInsideComponent } from './course-inside.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseInsideComponent
      }
    ])
  ],

  declarations: [CourseInsideComponent]
})
export class CourseInsideModule { }

