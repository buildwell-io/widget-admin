import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crm-calc-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './calc-widget.component.html',
  styleUrl: './calc-widget.component.scss'
})
export class CalcWidgetComponent implements OnInit {
  // @ts-expect-error i need to initialize that shit in onInit method and not here, idiot
  mainFormGroup: FormGroup;
  // @ts-expect-error i need to initialize that shit in onInit method and not here, idiot
  firstFormGroup: FormGroup;
  // @ts-expect-error i need to initialize that shit in onInit method and not here, idiot
  secondFormGroup: FormGroup;

  currentStep = 0;
  constructor(private readonly _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.mainFormGroup = this._formBuilder.group({
      formCount: 1,
      stepData: this._formBuilder.array([
        this._formBuilder.group({
          name: ["", Validators.required]
        })
      ])
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  addInput(currentIndex: number): void {
    const arrayControl = <FormArray>this.mainFormGroup.controls["stepData"];
    const newGroup = this._formBuilder.group({
      name: ["", Validators.required]
    });
    arrayControl.push(newGroup);
    setTimeout(( ) => {
      this.currentStep = currentIndex + 1;
    });
  }

  getControls(controlName: string): AbstractControl<any, any>[] {
    return (this.mainFormGroup.get(controlName) as FormArray).controls;
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.mainFormGroup.controls["stepData"];
    arrayControl.removeAt(index);
  }

  protected readonly FormGroup = FormGroup;

  getThisFormGoup(stepForm: AbstractControl<any, any>) {
    return stepForm as FormGroup;
  }
}
