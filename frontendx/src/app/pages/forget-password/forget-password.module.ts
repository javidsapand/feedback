import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';



import { ForgetPasswordComponent } from './forget-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForgetPasswordComponent
      }
    ])
  ],

  declarations: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
