import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { JobAdFormComponent } from './components/job-ad-form/job-ad-form.component';
import { JobAdItemCardComponent } from './components/job-ad-item-card/job-ad-item-card.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { AclGuard } from './guards/acl.guard';
import { UserItemCardComponent } from './components/user-item-card/user-item-card.component';


const routes: Routes = [
  {
    path: 'list', 
    component: MainComponent
  }, 
  {
    path: 'create', 
    component: JobAdFormComponent,
    canActivate: [AclGuard]
  }, 
  {
    path: 'edit/:id', 
    component: JobAdFormComponent,
    canActivate: [AclGuard]
  }, 
  {
    path: 'login', 
    component:LoginComponent
  },
  {
    path: '', 
    redirectTo: 'list', 
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    JobAdFormComponent,
    JobAdItemCardComponent,
    LoginComponent,
    UserItemCardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
