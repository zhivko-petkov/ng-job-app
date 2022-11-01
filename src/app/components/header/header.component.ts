import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = localStorage.getItem("loggedUser");
  
  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout(); 
    location.reload(); 
    this.router.navigate(['/']); 
  }

}