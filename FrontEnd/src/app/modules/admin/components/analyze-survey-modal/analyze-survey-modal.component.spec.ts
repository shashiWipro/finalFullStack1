import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeSurveyModalComponent } from './analyze-survey-modal.component';

describe('AnalyzeSurveyModalComponent', () => {
  let component: AnalyzeSurveyModalComponent;
  let fixture: ComponentFixture<AnalyzeSurveyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeSurveyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeSurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
