import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGroup !: FormGroup; 
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.login$(this.loginGroup.value).subscribe({
      next: (response) => {
        if (response) {

        this.authService.storeUserData(response);

         this.router.navigate(['/'])
         .then(() => {
          location.reload();
        });
        }
      }
    });
  }

}
