import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';



import { InstructorPortfolioComponent } from './instructor-portfolio.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InstructorPortfolioComponent
      }
    ])
  ],

  declarations: [InstructorPortfolioComponent]
})
export class InstructorPortfolioModule { }
