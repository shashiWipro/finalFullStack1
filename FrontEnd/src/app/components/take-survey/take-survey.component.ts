import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { UtilityService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  surveyId;
  survey;
  showSurvey = false;
  resultForm: FormGroup;
  userCheckErrorMessage = '';
  responseSaved = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private formbuilder: FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router
    ) { }

  ngOnInit() {
    this.surveyId = this.activatedRoute.snapshot.params.survyeId;
    this.formInitialize();
    this.getSurvey();
  }

  formInitialize() {
    this.resultForm = this.formbuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      takenOn: [''],
      surveyId: [this.surveyId]
    });
  }

  getSurvey() {
    this.adminService.getSurvey(this.surveyId).subscribe((resp: any) => {
      this.survey = resp.resultObject;
      console.log('survey', this.survey);
    });
  }

  surveyResponse(surveyResponse) {
    this.resultForm.get('takenOn').setValue(new Date().getTime());
    const data = Object.assign({}, this.resultForm.value, surveyResponse);
    this.userService.saveSurveyResponse(data).subscribe((resp: any) => {
      if (resp.result) {
        this.router.navigate(['../listSurveys']);
        this.responseSaved = true;
        this.utilityService.openSnackBar('Response saved successfully', 'Ok');
      } else {
        this.utilityService.openSnackBar('Some error occured', 'Ok');
      }
    });
    console.log('data', data);
  }

  submit() {
    this.userService.checkUser(this.resultForm.value).subscribe((resp: any) => {
      if (resp.result) {
        this.responseSaved = false;
        this.showSurvey = true;
        this.userCheckErrorMessage = '';
      } else {
        this.userCheckErrorMessage = 'You can take survey only once';
        console.log('as');
      }
    });
  }

  canDeactivate() {
    if (!this.responseSaved) {
        return window.confirm('Looks like there are unsaved changes. Do you still want to proceed?');
    } else {
      return true;
    }
  }
}
