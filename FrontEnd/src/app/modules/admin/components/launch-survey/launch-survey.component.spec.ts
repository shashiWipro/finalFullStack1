import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchSurveyComponent } from './launch-survey.component';

describe('LaunchSurveyComponent', () => {
  let component: LaunchSurveyComponent;
  let fixture: ComponentFixture<LaunchSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
