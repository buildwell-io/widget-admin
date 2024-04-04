import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'crm-default-step',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './default-step.component.html',
  styleUrl: './default-step.component.scss'
})
export class DefaultStepComponent {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup<any>({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
      }
    )
    // super(1, wizardService.getSteps(), true, formcontrols);
  }

}
