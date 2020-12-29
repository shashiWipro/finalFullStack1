import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { TakeSurveyComponent } from './components/take-survey/take-survey.component';
import { ListSurveysComponent } from './components/list-surveys/list-surveys.component';
import { CanDeactivateRouteGuard } from './services/auth-guard/can-deactivate-route-guard.service';
import { CanActivateRouteGuard } from './services/auth-guard/can-activate-route-guard.service';


const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      { path: '', redirectTo: 'listSurveys', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {  path: 'listSurveys', component: ListSurveysComponent },
      { path: 'takeSurvey/:survyeId', component: TakeSurveyComponent, canDeactivate: [CanDeactivateRouteGuard] }
    ]
  },
  {
    path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [CanActivateRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
