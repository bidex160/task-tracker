import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    organization: new FormControl(null, Validators.required),
    fullName: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  isSignUp: boolean = false;
  loading: boolean = false;

  constructor(private authSer: AuthService, private router: Router) {}

  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.form.reset();
  }

  get loginValidator() {
    return this.form.value.email && this.form.value.password;
  }

  login() {
    this.authSer.login(this.form.value).subscribe({
      next: (res) => {
        if (res.status) this.router.navigate(['/', 'tasks']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }

  signUp() {
    this.authSer.signup(this.form.value).subscribe({
      next: (res) => {
        if (res.status) this.router.navigate(['/', 'tasks']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
