import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeSurveyComponent } from './analyze-survey.component';

describe('AnalyzeSurveyComponent', () => {
  let component: AnalyzeSurveyComponent;
  let fixture: ComponentFixture<AnalyzeSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
