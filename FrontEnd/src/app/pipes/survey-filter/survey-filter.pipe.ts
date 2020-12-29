import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surveyFilter'
})
export class SurveyFilterPipe implements PipeTransform {

  transform(value: any[], status: string): any {

    const result = [];
    value.map((survey: any) => {
      if (survey.status === status) {
        result.push(survey);
      }
    });
    return result;
  }

}
