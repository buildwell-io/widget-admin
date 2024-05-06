import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Answer, Step } from './entities/step';
import { ANSWERS, STEPS } from './entities/data';

@Injectable({ providedIn: 'root' })
export class FetchService {
  getStep(stepId: number): Observable<Step> {
    return of(STEPS.find((step) => step.id === stepId)!);
  }

  getSteps(): Observable<Step[]> {
    return of(STEPS);
  }

  getStepAnswers(stepId: number): Observable<Answer[]> {
    return of(ANSWERS.filter((answer) => answer.step === stepId));
  }

  getInitialStep(): Observable<Step> {
    return of(STEPS.find((step) => step.initial)!);
  }
}
