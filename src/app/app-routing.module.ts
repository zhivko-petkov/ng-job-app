import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { JobAdFormComponent } from './components/job-ad-form/job-ad-form.component';
import { JobAdItemCardComponent } from './components/job-ad-item-card/job-ad-item-card.component';

const routes: Routes = [
  {
    path: 'jobAds', 
    component: JobAdItemCardComponent
  }, 
  {
    path: 'jobAd/create', 
    component: JobAdFormComponent
  }, 
  {
    path: 'jobAd/edit/:id', 
    component: JobAdFormComponent
  },
  {
    path: 'login', 
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}