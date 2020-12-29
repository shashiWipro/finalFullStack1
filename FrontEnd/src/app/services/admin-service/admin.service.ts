import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serviceUrl = environment.serviceUrl;

  public questionsFormArray: FormArray;
  public surveyForm: FormGroup;
  surveyToEdit: number;

  constructor(
    private http: HttpClient
  ) { }

  login(data) {
    return this.http.post(this.serviceUrl + '/admin/login', data);
  }

  saveSurvey(data) {
    return this.http.post(this.serviceUrl + '/admin/saveSurvey', data);
  }

  getAllSurveys() {
    return this.http.get(this.serviceUrl + '/admin/getAllSurveys');
  }

  getSurvey(id) {
    return this.http.get(this.serviceUrl + '/admin/getSurvey/' + id);
  }

  launchSurvey(data) {
    return this.http.put(this.serviceUrl + '/admin/launchSurvey', data);
  }

  deleteSurvey(id) {
    return this.http.delete(this.serviceUrl + '/admin/deleteSurvey/' + id);
  }

  getPublishedSurveys() {
    return this.http.delete(this.serviceUrl + '/admin/getPublishedSurvey')
  }

  createUser(data) {
    return this.http.post(this.serviceUrl + '/admin/createUser', data);
  }

  getSurveysForAnalysis() {
    return this.http.get(this.serviceUrl + '/admin/getSurveysForAnalysis');
  }

  getSurveyResponses(data) {
    return this.http.post(this.serviceUrl + '/admin/getSurveyResponses', data);
  }

  getSurveyResponsesForChart() {
    return this.http.get(this.serviceUrl + '/admin/getSurveyResponsesForChart');
  }
}
