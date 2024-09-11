import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'crm-sign-in',
    standalone: true,
    imports: [ CommonModule, MatFormField, MatLabel, MatError, MatInput, MatButton, ReactiveFormsModule, JsonPipe ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
    public readonly formGroup = new FormGroup({
        email: new FormControl<null | string>(null, [ Validators.required, Validators.email ]),
        password: new FormControl<null | string>(null, [ Validators.required ]),
    });

    onNextClick(): void {
        Object.values(this.formGroup.controls).forEach((control) => {
            control.markAsTouched();
            control.updateValueAndValidity();
        });

        if (this.formGroup.valid) {
            console.log('do smth');
        }
    }
}
