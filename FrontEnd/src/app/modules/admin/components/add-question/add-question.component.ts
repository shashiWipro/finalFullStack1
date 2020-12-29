import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../../model/Question.model';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;
  showErrorMessage = false;

  @Input()
  responseType;

  @Input()
  validations;

  options = [];
  optionTextBox = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
  ) {
    this.responseType = this.dialogData.responseType;
    this.validations = this.dialogData.validations;
  }

  ngOnInit() {
    if (this.dialogData.form) {
      this.options = Array.from(this.dialogData.form.options);
      this.formInitialize(this.dialogData.form);
    } else {
      this.options = [];
      this.formInitialize(new Question());
    }
  }

  formInitialize(question: Question) {
    this.questionForm =  this.formBuilder.group({
      question: [question.question, [Validators.required]],
      responseType: [question.responseType, [Validators.required]],
      validation: [question.validation],
      isMandatory: [question.isMandatory],
      options: [this.options],
      id: [question.id]
    });
  }

  addQuestion() {
    if ((this.questionForm.value.responseType === 'SSO' || this.questionForm.value.responseType === 'MSO') && this.options.length === 0) {
      this.showErrorMessage = true;
    } else {
      this.dialogRef.close({
        data: this.questionForm
      });
    }
  }

  addOption() {
    this.options.push(this.optionTextBox);
    this.optionTextBox = '';
  }

}
