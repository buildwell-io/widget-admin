import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormStepService } from './components/dynamic-form/dynamic-form-step.service';

@Component({
  selector: 'crm-calc-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    DynamicFormComponent,
  ],
  templateUrl: './calc-widget.component.html',
  styleUrl: './calc-widget.component.scss'
})
export class CalcWidgetComponent {

  dynamicFormStepService = inject(DynamicFormStepService)
  cdr = inject(ChangeDetectorRef)
  _formBuilder = inject(FormBuilder)

  currentStep = 0;
  constructor() {
  }

  createNewControl() {
    this.dynamicFormStepService.createNewQuestion()
    this.cdr.detectChanges()
  }
}
