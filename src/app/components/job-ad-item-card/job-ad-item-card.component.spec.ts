import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdItemCardComponent } from './job-ad-item-card.component';

describe('JobAdItemCardComponent', () => {
  let component: JobAdItemCardComponent;
  let fixture: ComponentFixture<JobAdItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAdItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
