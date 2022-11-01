import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { JobAdModel } from 'src/app/models/jobAd.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { JobAdService } from 'src/app/services/jobAd.service';

@Component({
  selector: 'app-job-ad-form',
  templateUrl: './job-ad-form.component.html',
  styleUrls: ['./job-ad-form.component.scss']
})
export class JobAdFormComponent implements OnInit {

  formGroup !: FormGroup;

  jobAd !: JobAdModel; 
  categories !: CategoryModel[]; 

  constructor(
    private fb: FormBuilder, 
    private jobAdService: JobAdService,
    private categoriesService: CategoriesService,
    private router: Router, 
    private route: ActivatedRoute
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

    const data = {
      ...this.formGroup.value,
      categoryId: parseInt(this.formGroup.value.categoryId)
    };



    if(data.id) {
      this.jobAdService.put$(data).subscribe({
        next: () => {
          this.router.navigate(['/list']); 
        }
      });
    } else {
      console.log(data); 
      data.id = '';
      this.jobAdService.post$(data).subscribe({
        next: () => {
          this.router.navigate(['/list']); 
        }
      });
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
