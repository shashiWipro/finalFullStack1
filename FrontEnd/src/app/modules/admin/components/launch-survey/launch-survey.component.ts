import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-launch-survey',
  templateUrl: './launch-survey.component.html',
  styleUrls: ['./launch-survey.component.css']
})
export class LaunchSurveyComponent implements OnInit {

  allSurveys = [];
  takeSurveyLink;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const urlArray = window.location.href.split('//');
    this.takeSurveyLink = urlArray[0] + '//' + urlArray[1].split('/')[0] + '/takeSurvey/';
    this.getAllSurvey();
  }

  getAllSurvey() {
    this.adminService.getAllSurveys().subscribe((resp: any) => {
      this.allSurveys = resp.resultObject;
      console.log('surveys', this.allSurveys);
    });
  }

  launchSurvey(survey) {
    this.adminService.launchSurvey({id: survey.id}).subscribe((resp: any) => {
      console.log('launched');
      this.getAllSurvey();
      this.utilityService.openSnackBar('Survey published successfully', 'Ok');
    });
  }

  editSurvey(survey) {
    this.adminService.surveyToEdit = survey.id;
    this.router.navigate(['admin/createSurvey']);
  }

  deleteSurvey(survey) {
    this.adminService.deleteSurvey(survey.id).subscribe((resp: any) => {
      this.getAllSurvey();
      this.utilityService.openSnackBar('Survey deleted successfully', 'Ok');
    });
  }

  copyData(surveyId) {
    const input = document.createElement('textarea');
    input.value = this.takeSurveyLink + surveyId;
    document.getElementById('copyContainer').appendChild(input);
    input.select();
    document.execCommand('copy');
    document.getElementById('copyContainer').removeChild(input);
    this.utilityService.openSnackBar('Link copied to clipboard', 'Ok');
  }
}
