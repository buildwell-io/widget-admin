import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicFormStepBase } from './dynamic-form-step-base';

@Injectable()
export class DynamicFormControlService {
  toFormGroup(steps: DynamicFormStepBase<string>[] ) {
    const group: any = {};

    steps.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  updateFormGroup() {}
}

