import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { LaunchSurveyComponent } from './components/launch-survey/launch-survey.component';
import { AnalyzeSurveyComponent } from './components/analyze-survey/analyze-survey.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyFilterPipe } from 'src/app/pipes/survey-filter/survey-filter.pipe';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AnalyzeSurveyModalComponent } from './components/analyze-survey-modal/analyze-survey-modal.component';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';


@NgModule({
  declarations: [
    AdminLandingComponent,
    CreateSurveyComponent,
    LaunchSurveyComponent,
    AnalyzeSurveyComponent,
    AddQuestionComponent,
    SurveyFilterPipe,
    CreateUserComponent,
    AnalyzeSurveyModalComponent,
    ChartModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddQuestionComponent,
    AnalyzeSurveyModalComponent,
    ChartModalComponent
  ],
  providers: [
    DatePipe
  ]
})
export class AdminModule { }
