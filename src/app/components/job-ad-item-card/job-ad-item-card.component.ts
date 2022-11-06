import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CandidateModel } from 'src/app/models/candidates.model';
import { JobAdModel } from 'src/app/models/jobAd.model';
import { UserCandidateModel } from 'src/app/models/userCandidateView.model';
import { JobAdService } from 'src/app/services/jobAd.service';
import { Organization } from '../auth/models/organization.model';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-job-ad-item-card',
  templateUrl: './job-ad-item-card.component.html',
  styleUrls: ['./job-ad-item-card.component.scss']
})
export class JobAdItemCardComponent implements OnInit{

  isLoggedIn = localStorage.getItem("loggedUser");
  isOrganization = (this.isLoggedIn != null && JSON.parse(this.isLoggedIn).company) ? true : false;
  isApplied = false; 
  currentOrganization !: Organization; 
  loggedInUserId !: number; 
  candidatesView : UserCandidateModel[] = []; 
  candidate !: User; 
  applicationStatus !: [];
  isCandidate !: boolean; 



  @Input() jobAd!: JobAdModel;
  
  @Output() clicked: EventEmitter<JobAdModel> = new EventEmitter<JobAdModel>(); 
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>(); 

  

  constructor(private jobAdService: JobAdService, public authService: AuthService) { 
    this.loggedInUserId = authService.getUserFromStorage().id;  
    if (this.isLoggedIn != null && this.isOrganization) {
      this.currentOrganization = JSON.parse(this.isLoggedIn)
    } 

  }

  ngOnInit(): void {
          this.jobAd.candidates.forEach(j => {
            this.authService.users.forEach(u => {
              if(u.id == j.userId){
              this.candidatesView.push(new UserCandidateModel(u.id, j.applicationStatus, u.email, this.jobAd.id!));
              if(this.loggedInUserId == j.userId) {
                this.isCandidate = true; 
              }
            }
            })
            
          })

      console.log(this.candidatesView);
      
  }

  onClick(): void {
    if(this.currentOrganization.id === this.jobAd.organizationId){
      this.clicked.emit(this.jobAd);
    }
    
  }

  onDelete(): void {
    if(this.currentOrganization.id === this.jobAd.organizationId){
      this.deleted.emit(this.jobAd.id); 
    }
  }

  
  onItemClick(jobAd: JobAdModel): void {
    this.jobAdService.like(jobAd);
  }

  onApplyClick(jobAd: JobAdModel): void {
    this.jobAdService.apply(jobAd); 
  }

  onApprove(ca: CandidateModel, jobAd: JobAdModel): void {
    this.jobAdService.approveUserJobAd(ca, jobAd);
  }

  onDecline(ca: CandidateModel, jobAd: JobAdModel): void {
    this.jobAdService.cancelUserJobAd(ca, jobAd);
  }


}
