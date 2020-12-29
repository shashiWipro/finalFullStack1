import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-analyze-survey-modal',
  templateUrl: './analyze-survey-modal.component.html',
  styleUrls: ['./analyze-survey-modal.component.css']
})
export class AnalyzeSurveyModalComponent implements OnInit {

  searchForm: FormGroup;
  responses: any;
  showResultFlag = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    console.log('data', this.dialogData);
    this.formInitialize('', '');
  }

  formInitialize(from, to) {
    this.searchForm = this.formBuilder.group({
      from: [from],
      to: [to]
    });
  }

  getResults() {
    const data = {
      from: new Date(this.searchForm.value.from).getTime(),
      to: new Date(this.searchForm.value.to).getTime(),
      surveyId: this.dialogData.id
    };
    this.adminService.getSurveyResponses(data).subscribe((resp: any) => {
      this.responses = resp.resultObject;
      this.showResultFlag = true;
      console.log(this.responses);
    });
  }

  resetForm() {
    this.formInitialize('', '');
  }

  exportToCsv() {
    let data =  'Survey Name,' + this.dialogData.surveyName +
                '\nCreated on,' + this.datePipe.transform(this.dialogData.createdOn, 'dd-MMM-yyyy') +
                ',Closed on,' + this.datePipe.transform(this.dialogData.validTill, 'dd-MMM-yyyy') +
                '\nStatus,' + this.dialogData.status +
                '\nNo of Responses,' + this.responses.length;

    if (this.responses.length > 0) {
      data += '\n\n,,';
      this.responses[0].questions.forEach((question) => {
        data += question.question + ',';
      });
    }

    this.responses.forEach((response) => {
      data += '\r\n';
      data += '\nName,' + response.name;
      response.questions.forEach((question) => {
        data += ',"' + question.answer + '"';
      });

      data += '\nEmail Id,' + response.emailId + '\nTaken on,' + this.datePipe.transform(response.takenOn, 'dd-MMM-yyyy');
    });

    const a = document.createElement('a');
    const blob = new Blob([data], {type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = this.dialogData.surveyName + ' responses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
