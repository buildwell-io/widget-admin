import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'crm-sign-up',
    standalone: true,
    imports: [ CommonModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule ],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
}
