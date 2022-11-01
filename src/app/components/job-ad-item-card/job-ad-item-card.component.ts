import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobAdModel } from 'src/app/models/jobAd.model';

@Component({
  selector: 'app-job-ad-item-card',
  templateUrl: './job-ad-item-card.component.html',
  styleUrls: ['./job-ad-item-card.component.scss']
})
export class JobAdItemCardComponent {

  @Input() jobAd!: JobAdModel;
  
  @Output() clicked: EventEmitter<JobAdModel> = new EventEmitter<JobAdModel>(); 
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>(); 

  constructor() { }

  onClick(): void {
    this.clicked.emit(this.jobAd);
  }

  onDelete(): void {
    this.deleted.emit(this.jobAd.id); 
  }

}
