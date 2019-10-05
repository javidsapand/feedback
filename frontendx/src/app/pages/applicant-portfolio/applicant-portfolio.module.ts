import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';



import { ApplicantPortfolioComponent } from './applicant-portfolio.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApplicantPortfolioComponent
      }
    ])
  ],

  declarations: [ApplicantPortfolioComponent]
})
export class ApplicantPortfolioModule { }
