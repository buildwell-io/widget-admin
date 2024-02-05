import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PASSWORD_REGEXP } from '../constants/regex.constants';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'crm-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]),
  });
  hide: boolean = true;

  constructor(
      private readonly authService: AuthService,
      private readonly router: Router
      ) {
  }

  get fc(){
    return this.form.controls;
  }

  submit(){
    if (this.form.valid) {
      this.authService.signIn(this.form.value as any)
          .subscribe(() => {
            this.router.navigate(['/dashboard'])
          })
    }
    console.log(this.form.value);
  }
}
