import { Injectable } from '@angular/core';

import { DropdownCtrl } from './dynamic-form-dropdown';
import { DynamicFormStepBase } from './dynamic-form-step-base';
import { TextboxCtrl } from './dynamic-form-textbox';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DynamicFormStepService {
  private questions: DynamicFormStepBase<string>[] = [

    new DropdownCtrl({
      key: 'brave',
      label: 'Bravery Rating',
      options: [
        {key: 'solid',  value: 'Solid'},
        {key: 'great',  value: 'Great'},
        {key: 'good',   value: 'Good'},
        {key: 'unproven', value: 'Unproven'}
      ],
      order: 3
    }),

    new TextboxCtrl({
      key: 'firstName',
      label: 'First name',
      value: 'Bombasto',
      required: true,
      order: 1
    }),

    new TextboxCtrl({
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      order: 2
    })
  ];

  // TODO: get from a remote source of question metadata
  getQuestions() {
    return of(this.questions.sort((a, b) => a.order - b.order));
  }

  createNewQuestion() {
    this.questions.push(new TextboxCtrl({
      key: Math.random().toString(),
      label: 'fghjkl',
      value: 'bumbastic',
      required: true,
      order: 3}))
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
