import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { DynamicFormStepBase } from '../dynamic-form-step-base';

@Component({
  standalone: true,
  selector: 'crm-dynamic-form-step',
  templateUrl: './dynamic-form-step.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicFormQuestionComponent {
  @Input() step!: DynamicFormStepBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.step.key].valid;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
