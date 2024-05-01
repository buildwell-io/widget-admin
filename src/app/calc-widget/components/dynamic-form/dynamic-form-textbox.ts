import { DynamicFormStepBase } from './dynamic-form-step-base';

export class TextboxCtrl extends DynamicFormStepBase<string> {
  override controlType = 'textbox';
}
