import { Question } from './Question.model';

export class Survey {
    createdOn: number;
    id: number;
    status = 'DRAFT';
    surveyName: string;
    questions: Question[] = [];
    validTill: number;
    description: string;
}
