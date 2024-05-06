import { AbstractControl } from './abstract-control';

export class TextboxControl extends AbstractControl<string> {
  override controlType = 'textbox';
}
