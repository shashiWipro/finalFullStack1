import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { LaunchSurveyComponent } from './components/launch-survey/launch-survey.component';
import { AnalyzeSurveyComponent } from './components/analyze-survey/analyze-survey.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CanDeactivateRouteGuard } from 'src/app/services/auth-guard/can-deactivate-route-guard.service';


const routes: Routes = [
  { path: '', component: AdminLandingComponent,
    children: [
      { path: '', redirectTo: 'createSurvey', pathMatch: 'full' },
      { path: 'createSurvey', component: CreateSurveyComponent, canDeactivate: [CanDeactivateRouteGuard] },
      { path: 'launchSurvey', component: LaunchSurveyComponent },
      { path: 'analyzeSurvey', component: AnalyzeSurveyComponent },
      { path: 'createAdmin', component: CreateUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
