import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-surveys',
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.css']
})
export class ListSurveysComponent implements OnInit {

  surveyList = [];
  takeSurveyLink;

  constructor(
    private router: Router,
    private adminService: AdminService
    ) { }

  ngOnInit() {
    const urlArray = window.location.href.split('//');
    this.takeSurveyLink = urlArray[0] + '//' + urlArray[1].split('/')[0] + '/takeSurvey/';
    this.getPublishedSurveys();
  }

  getPublishedSurveys() {
    this.adminService.getPublishedSurveys().subscribe((resp: any) => {
      this.surveyList = resp.resultObject;
    });
  }

}
