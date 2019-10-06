import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {Layouts} from './interfaces/app.interfaces'

const routes: Routes = [
  {
    path: 'applicant-portfilio/:user_id',
    loadChildren: () => import('./pages/applicant-portfolio/applicant-portfolio.module').then(s => s.ApplicantPortfolioModule),
    data: { title: 'Course List' }
  },
  {
    path: 'certificate',
    loadChildren: () => import('./pages/certificate/certificate.module').then(s => s.CertificateModule),
    data: { title: 'Course List' }
  },
  {
    path: 'course-create',
    loadChildren: () => import('./pages/course-create/course-create.module').then(s => s.CourseCreateModule),
    data: { title: 'Course List' }
  },
  {
    path: 'course-details/:id',
    loadChildren: () => import('./pages/course-details/course-details.module').then(s => s.CourseDetailsModule),
    data: { title: 'Course Details', layout: Layouts.HEADER }
  },
  {
    path: 'course-inside',
    loadChildren: () => import('./pages/course-inside/course-inside.module').then(s => s.CourseInsideModule),
    data: { title: 'Course List' }
  },
  {
    path: 'course-list',
    loadChildren: () => import('./pages/course-list/course-list.module').then(s => s.CourseListModule),
    data: { title: 'Course List', layout: Layouts.SIDEBAR}
  },
  {
    path: 'instructor-portfilio/:id',
    loadChildren: () => import('./pages/instructor-portfolio/instructor-portfolio.module').then(s => s.InstructorPortfolioModule),
    data: { title: 'Course List' }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(s => s.LoginModule),
    data: { title: 'Login', layout: Layouts.EMPTY }
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(s => s.SignupModule),
    data: { title: 'Course List' }
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then(s => s.ForgetPasswordModule),
    data: { title: 'Course List' }
  },
  {
    path: 'renew-password',
    loadChildren: () => import('./pages/renew-password/renew-password.module').then(s => s.RenewPasswordModule),
    data: { title: 'Course List' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
