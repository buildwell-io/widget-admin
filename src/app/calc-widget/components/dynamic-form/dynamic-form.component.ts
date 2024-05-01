import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormStepBase } from './dynamic-form-step-base';
import { DynamicFormControlService } from './dynamic-form-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-step/dynamic-form-step.component';

@Component({
  standalone: true,
  selector: 'crm-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  imports: [ CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule ],
})
export class DynamicFormComponent {
  @Input() steps: DynamicFormStepBase<string>[] | null = [];

  get form(): FormGroup {
    return this.qcs.toFormGroup(this.steps as DynamicFormStepBase<string>[]);
  }

  payLoad = '';

  constructor(private qcs: DynamicFormControlService) {
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
