import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Answer, Step } from './entities/step';
import { FetchService } from './fetch.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnswerComponent } from './components/create-answer.component';
import { ANSWERS } from './entities/data';

@Component({
  selector: 'crm-calc-widget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './calc-widget.component.html',
  styleUrl: './calc-widget.component.scss',
})
export class CalcWidgetComponent {
  public readonly fetchService = inject(FetchService);
  private readonly dialog = inject(MatDialog);

  public activeStep: number | null = null;

  filter(steps: Step[], except: Step): Step[] {
    return steps.filter((step) => step !== except);
  }

  getStep(): Observable<Step> {
    return this.activeStep != null ?
      this.fetchService.getStep(this.activeStep) :
      this.fetchService.getInitialStep();
  }

  onAddAnswerClick(targetStep: number, availableSteps: Step[]): void {
    const dialogRef = this.dialog.open(CreateAnswerComponent, {
      data: { availableSteps },
    });

    dialogRef.afterClosed().subscribe((result) => {
      ANSWERS.push(new Answer(ANSWERS.length, result.text, targetStep, result.nextStep));
    });
  }

  onRemoveClick(answerId: number): void {
    const answerIndex = ANSWERS.findIndex((answer) => answer.id === answerId);
    ANSWERS.splice(answerIndex, 1);
  }
}
