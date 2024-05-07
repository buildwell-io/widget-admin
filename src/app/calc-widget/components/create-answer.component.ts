import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  template: `
      <h2 mat-dialog-title>Create Answer</h2>
      
      <mat-dialog-content>
          <form [formGroup]="form">
              <div>
                  <mat-form-field>
                      <mat-label>Answer text</mat-label>
                      <input matInput placeholder="Text" formControlName="text">
                  </mat-form-field>
              </div>

              <div>
                  <mat-form-field>
                      <mat-select formControlName="nextStep">
                          @for (step of data.availableSteps; track step.id) {
                              <mat-option [value]="step.id">{{ step.title }}</mat-option>
                          }
                      </mat-select>
                  </mat-form-field>
              </div>
          </form>
      </mat-dialog-content>
      
      <mat-dialog-actions>
          <button mat-button (click)="dialogRef.close()">Cancel</button>
          <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Create</button>
      </mat-dialog-actions>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogClose,
  ],
})
export class CreateAnswerComponent {
  public readonly dialogRef = inject(MatDialogRef<CreateAnswerComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  public readonly form = new FormGroup({
    text: new FormControl<string>('', Validators.required),
    nextStep: new FormControl<number | null>(null, Validators.required),
  });
}
