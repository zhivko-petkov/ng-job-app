import { Component, OnInit } from '@angular/core';
import { JobAdModel } from 'src/app/models/jobAd.model';
import { JobAdService } from 'src/app/services/jobAd.service';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  jobAds!: JobAdModel[]; 
  loggedUser !: User; 

  constructor(private jobAdService: JobAdService, authService: AuthService) { 
    this.loggedUser = authService.getUserFromStorage();
  }

  ngOnInit(): void {
    this.jobAdService.getAll$().subscribe({
      next: (response: JobAdModel[]) => {
        this.jobAds = response; 
      }
    });
  }
 
  onItemDeleted(id: number): void {
    this.jobAdService.delete$(id).subscribe({
      next: () => {
        this.jobAds = this.jobAds.filter(j => j.id !== id); 
      }
    });
  }

  

}
