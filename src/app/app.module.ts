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


const routes: Routes = [
  {
    path: 'list', 
    component: MainComponent
  }, 
  {
    path: 'create', 
    component: JobAdFormComponent
  }, 
  {
    path: 'edit/:id', 
    component: JobAdFormComponent
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
    LoginComponent,
    JobAdFormComponent,
    JobAdItemCardComponent,
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
