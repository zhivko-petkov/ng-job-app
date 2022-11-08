import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { JobAdModel } from 'src/app/models/jobAd.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { JobAdService } from 'src/app/services/jobAd.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-job-ad-form',
  templateUrl: './job-ad-form.component.html',
  styleUrls: ['./job-ad-form.component.scss']
})
export class JobAdFormComponent implements OnInit {

  isLoggedIn = localStorage.getItem("loggedUser");

  formGroup !: FormGroup;

  jobAd !: JobAdModel; 

  jobAds !: JobAdModel[]; 

  categories !: CategoryModel[]; 

  constructor(
    private fb: FormBuilder, 
    private jobAdService: JobAdService,
    private categoriesService: CategoriesService,
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAll$().subscribe({
      next: (response: CategoryModel[]) => {
        this.categories = response; 
      }
    });

    this.buildForm(); 

    const id = this.route.snapshot.params['id'];
    
      this.jobAdService.getById$(id).subscribe({
        next: (response: JobAdModel) => {
          this.jobAd = response; 
          this.buildForm(); 
        }
      });

     

    }

  onSubmit(): void {

    if(!this.formGroup.valid) {
      return; 
    }

    if(this.isLoggedIn != null) {
    let currentUser = JSON.parse(this.isLoggedIn);

     const data = {
      ...this.formGroup.value,
      categoryId: parseInt(this.formGroup.value.categoryId)
    };

    
    if(data.id) {
      this.jobAdService.getJobsByAddedOrganization$(currentUser.id).subscribe({
        next: (response: JobAdModel[]) => {
          this.jobAds = response; 
        }
      });

      this.jobAdService.getById$(data.id).subscribe({
        next: (response: JobAdModel) => {
        this.jobAd = response; 
      }
    }); 

      if(this.authService.jobAdIsOnOrganization(this.jobAd.organizationId)) {
        data.organizationId = currentUser.id;
        data.likes = this.jobAd.likes; 
        data.candidates = this.jobAd.candidates; 
        this.jobAdService.put$(data).subscribe({
        next: () => {
          this.router.navigate(['/list']); 
        }
      });
      } else {
        this.router.navigate(['/list']);
      }
      
      

      //console.log(this.jobAds)
    } else {
      
      data.id = '';
      data.organizationId = currentUser.id;

      this.jobAdService.post$(data).subscribe({
        next: () => {
          this.router.navigate(['/list']); 
        }
      });
        
      } 

    

    }
  }
  
 
  private buildForm(): void {
   
    this.formGroup = this.fb.group({
      id: this.jobAd?.id, 
      title: [this.jobAd?.title, [Validators.required]],
      description: this.jobAd?.description,
      categoryId: this.jobAd?.categoryId
    });
  }

}
