import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/modules/admin/model/Survey.model';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-survey-renderer',
  templateUrl: './survey-renderer.component.html',
  styleUrls: ['./survey-renderer.component.css']
})
export class SurveyRendererComponent implements OnInit {

  @Input()
  survey;
  questionsFormArray: FormArray;
  surveyForm: FormGroup;

  @Output() surveyResponse = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.formInitialize(this.survey);
  }

  getQuestionsFormArray(): FormArray {
    return (this.surveyForm.get('questions') as FormArray);
  }

  formInitialize(survey: Survey) {
    this.questionsFormArray = new FormArray([]);
    survey.questions.forEach((question: any) => {
      const questionForm = this.formBuilder.group({
        question: [question.question],
        responseType: [question.responseType],
        validation: [question.validation],
        isMandatory: [question.isMandatory]
      });
      const validatorsArray = [];
      let answer: any = '';
      if (question.responseType === 'SL') {
        switch (question.validation) {
          case 'AO':
            validatorsArray.push(Validators.pattern('[a-zA-Z]+'));
            break;
          case 'AN':
            validatorsArray.push(Validators.pattern('[a-zA-Z0-9_]'));
            break;
          case 'NO':
            validatorsArray.push(Validators.pattern(' [0-9]+'));
            break;
        }
      } else if (question.responseType === 'SSO' || question.responseType === 'MSO') {
        const options = question.options.split(',');
        questionForm.addControl('options', new FormControl(options));
        if (question.responseType === 'MSO') {
          answer = '';
        }
      }
      if (question.isMandatory) {
        validatorsArray.push(Validators.required);
      }
      questionForm.addControl('answer', new FormControl(answer, validatorsArray));
      this.questionsFormArray.push(questionForm);
    });
    this.surveyForm = this.formBuilder.group({
      surveyName: [survey.surveyName, [Validators.required]],
      questions: this.questionsFormArray,
      createdOn: [survey.createdOn],
      status: [survey.status],
      surveyId: [survey.id],
      validTill: [survey.validTill]
    });
    console.log('form', this.surveyForm);
  }

  submit() {
    const data = JSON.parse(JSON.stringify(this.surveyForm.value));
    // data.questions.forEach(question => {
    //   if (question.responseType === 'MSO') {
    //     question.answer = question.answer.join(',');
    //   }
    // });
    console.log(this.surveyForm);
    this.surveyResponse.emit(data);
    console.log('ans', data);
  }

  checkBoxClick(option, formGroup) {
    const answer = formGroup.value.answer === '' ? [] : formGroup.value.answer.split(',');
    if (answer.includes(option)) {
      answer.splice(answer.indexOf(option), 1);
    } else {
     answer.push(option);
    }
    formGroup.get('answer').setValue(answer.join(','));
  }
}
