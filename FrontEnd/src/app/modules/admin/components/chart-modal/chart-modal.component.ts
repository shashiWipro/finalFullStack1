import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})
export class ChartModalComponent implements OnInit {

  showChartFlag = false;
  surveyAnalysis: any;
  chart: Chart;

  @ViewChild('bar-chart', {static: false}) el: ElementRef;

  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private elementRef: ElementRef,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    this.adminService.getSurveyResponsesForChart().subscribe((resp: any) => {
      this.surveyAnalysis = resp.resultObject;
      console.log('------------------', this.surveyAnalysis);
      this.setChart();
      this.showChartFlag = true;
    });
  }

  setChart() {
    const label = [];
    const valueResponses = [];
    const valueQuestions = [];
    Object.keys(this.surveyAnalysis).forEach((resp: any) => {
      label.push(resp);
      valueResponses.push(this.surveyAnalysis[resp].noOfResponses);
      valueQuestions.push(this.surveyAnalysis[resp].noOfQuestions);
    });
    this.chart = new Chart(document.getElementById('canvas'), {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'No. of responses',
          barPercentage: 0.5,
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          barThickness: 50,
          hoverBackgroundColor: '#0479c4',
          data: valueResponses
        },
        {
          label: 'No. of questions',
          barPercentage: 0.5,
          borderColor: '#3cba9f',
          backgroundColor: '#3cba9f',
          barThickness: 50,
          hoverBackgroundColor: '#02a683',
          data: valueQuestions
        }]
      },
      options: {
        legend: {
          display: true,
          text: 'sd'
        },
        title: {
          display: false,
          text: 'Survey Responses'
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true
          }],
        },
        animation: {
          // duration: 5
        }
      }
    });
  }

  exportToCsv() {
    let data = 'Survey Name,No. of Questions,No. of responses,Created On, Valid till\n';

    Object.keys(this.surveyAnalysis).forEach((resp: any) => {
      data += '\n' + resp + ',' + this.surveyAnalysis[resp].noOfQuestions + ',' +
              this.surveyAnalysis[resp].noOfResponses + ',' + this.datePipe.transform(this.surveyAnalysis[resp].createdOn, 'dd-MMM-yyyy') +
              ',' + this.datePipe.transform(this.surveyAnalysis[resp].validTill, 'dd-MMM-yyyy');
    });

    const a = document.createElement('a');
    const blob = new Blob([data], {type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'Survey Analysis.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
