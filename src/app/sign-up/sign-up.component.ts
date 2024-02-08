import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PASSWORD_REGEXP } from '../constants/regex.constants';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'crm-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]),
  });
  hide: boolean = true;
  hideRepeat: boolean = true;

  constructor(
      private readonly authService: AuthService,
      private readonly router: Router) {
  }

  get fc(){
    return this.form.controls;
  }

  submit(){
    if (this.form.valid) {
      this.authService.signUp(this.form.value as any)
          .subscribe((response: any) => {
            this.router.navigate(['/sign-in'])
          })
    }
  }
}
