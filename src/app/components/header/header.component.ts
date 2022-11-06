import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/models/user.model';
import { AuthService, Roles } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = localStorage.getItem("loggedUser");
  loggedUserName = ''; 
  isOrganization = false; 
  
  

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    interface userInfo {
      name: String
    }
    if(this.isLoggedIn != null) {
      let obj = JSON.parse(this.isLoggedIn); 
      this.loggedUserName = obj.name;

      if(obj.company) {
        this.isOrganization = true; 
      }  else {
        this.isOrganization = false;
      }
    }

    
  }

  onLogout(): void {
    this.authService.logout(); 
    location.reload(); 
    this.router.navigate(['/']); 
  }

}
