import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Survey } from '../../model/Survey.model';
import { Question } from '../../model/Question.model';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit, OnDestroy {

  responseType = [
    {label: 'Single Line', value: 'SL'},
    {label: 'Multi Line', value: 'ML'},
    {label: 'Single Select Option', value: 'SSO'},
    {label: 'Multi Select Option', value: 'MSO'},
    {label: 'Date', value: 'DT'},
  ];

  validations = [
    {label: 'Alphabets Only', value: 'AO'},
    {label: 'AlphaNumeric', value: 'AN'},
    {label: 'Number Only', value: 'NO'}
  ];

  surveyExpireMessageflag = false;
  changesSaved = false;


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    public adminService: AdminService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    if (this.adminService.surveyToEdit) {
      this.adminService.getSurvey(this.adminService.surveyToEdit).subscribe((survey: any) => {
        survey.resultObject.questions.map((question: any) => {
          if (question.options.length === 0) {
            question.options = [];
          } else {
            question.options = question.options.split(',');
          }
        });
        this.formInitialize(survey.resultObject);
      })
    } else {
      this.formInitialize(new Survey());
    }
  }

  ngOnDestroy() {
    this.adminService.surveyToEdit = null;
  }

  formInitialize(survey: Survey) {
    this.adminService.questionsFormArray = new FormArray([]);
    survey.questions.forEach((question: Question) => {
      const questionForm = this.formBuilder.group({
        question: [question.question, [Validators.required]],
        responseType: [question.responseType, [Validators.required]],
        validation: [question.validation],
        options: [question.options],
        id: [question.id]
      });
      this.adminService.questionsFormArray.push(questionForm);
    });
    this.adminService.surveyForm = this.formBuilder.group({
      surveyName: [survey.surveyName, [Validators.required]],
      questions: this.adminService.questionsFormArray,
      createdOn: [survey.createdOn],
      status: [survey.status],
      id: [survey.id],
      validTill: [survey.validTill],
      description: [survey.description, [Validators.required]]
    });
  }

  addQuestion() {
    const dialog = this.dialog.open(AddQuestionComponent, {
      height: '400px',
      width: '600px',
      data: {
        validations: this.validations,
        responseType: this.responseType
      }
    });
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.adminService.questionsFormArray.push(result.data);
      }
    });
  }

  getLabelFromValue(type, value) {
    if (value) {
      if (type === 'responseType') {
        return (this.responseType.find(resp => resp.value === value)).label;
      } else {
        return (this.validations.find(val => val.value === value)).label;
      }
    }
    return '-';
  }

  submitSurvey() {
    let snackBarMessage = 'Survey updated successfully';
    if (!this.adminService.surveyToEdit) {
      this.adminService.surveyForm.get('createdOn').setValue(new Date().getTime());
      snackBarMessage = 'Survey created successfully';
    }
    console.log('survey', this.adminService.surveyForm.value);
    const data = JSON.parse(JSON.stringify(this.adminService.surveyForm.value));
    if (data.validTill) {
      data.validTill = new Date(data.validTill).getTime();
      if (data.validTill < new Date().getTime()) {
        this.surveyExpireMessageflag = true;
      } else {
        this.surveyExpireMessageflag = false;
      }
    }
    data.questions.forEach((question) => {
      question.options = question.options.join(',');
    });
    if (!this.surveyExpireMessageflag) {
      this.adminService.saveSurvey(data).subscribe((resp: any) => {
        if (resp.result) {
          console.log('saved');
          this.adminService.surveyForm.reset();
          this.adminService.questionsFormArray = this.formBuilder.array([]);
          this.adminService.surveyToEdit = null;
          this.utilityService.openSnackBar(snackBarMessage, 'Ok');
          this.changesSaved = true;
          this.router.navigate(['admin/launchSurvey']);
        }
      });
    }
  }

  editQuestion(questionForm, index) {
    const dialog = this.dialog.open(AddQuestionComponent, {
      height: '400px',
      width: '600px',
      data: {
        validations: this.validations,
        responseType: this.responseType,
        form: questionForm.value
      }
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.adminService.questionsFormArray.controls[index].setValue(result.data.value);
      }
    });
  }

  deleteQuestion(index) {
    this.adminService.questionsFormArray.removeAt(index);
  }

  canDeactivate() {
    if (this.adminService.surveyForm.dirty || this.adminService.questionsFormArray.controls.length > 0) {
        return window.confirm('Looks like there are unsaved changes. Do you still want to proceed?');
    } else {
      return true;
    }
  }
}
