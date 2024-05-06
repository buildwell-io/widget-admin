import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Step } from './entities/step';
import { FetchService } from './fetch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-calc-widget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './calc-widget.component.html',
  styleUrl: './calc-widget.component.scss',
})
export class CalcWidgetComponent {
  public readonly fetchService = inject(FetchService);

  public activeStep: number | null = null;

  filter(steps: Step[], except: Step): Step[] {
    return steps.filter((step) => step !== except);
  }

  getStep(): Observable<Step> {
    return this.activeStep != null ?
      this.fetchService.getStep(this.activeStep) :
      this.fetchService.getInitialStep();
  }
}
