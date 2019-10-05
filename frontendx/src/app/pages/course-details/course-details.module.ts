import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';
import { CourseDetailsComponent } from './course-details.component';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseDetailsComponent
      }
    ])
  ],

  declarations: [CourseDetailsComponent]
})
export class CourseDetailsModule { }
