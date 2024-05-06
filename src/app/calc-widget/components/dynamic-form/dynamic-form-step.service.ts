import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DropdownControl } from './dropdown-control';
import { TextboxControl } from './textbox-control';
import { AbstractControl } from './abstract-control';

@Injectable({ providedIn: 'root' })
export class DynamicFormStepService {
  private questions: AbstractControl<string>[] = [

    new DropdownControl({
      key: 'brave',
      label: 'Bravery Rating',
      options: [
        { key: 'solid', value: 'Solid' },
        { key: 'great', value: 'Great' },
        { key: 'good', value: 'Good' },
        { key: 'unproven', value: 'Unproven' },
      ],
      order: 3,
    }),

    new TextboxControl({
      key: 'firstName',
      label: 'First name',
      value: 'Bombasto',
      required: true,
      order: 1,
    }),

    new TextboxControl({
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      order: 2,
    }),
  ];

  // TODO: get from a remote source of question metadata
  getQuestions() {
    return of(this.questions.sort((a, b) => a.order - b.order));
  }

  createNewQuestion() {
    this.questions.push(new TextboxControl({
      key: Math.random().toString(),
      label: 'fghjkl',
      value: 'bumbastic',
      required: true,
      order: 3,
    }));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
