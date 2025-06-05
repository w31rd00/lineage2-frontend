import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {

    this.authService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        const token = res?.token; // Assuming API returns { token: "..." }
        if (token) {
          this.authService.saveToken(token);
          // this.snackBar.open(this.translate.instant('SNACK_BAR_SIGNED_IN_SUCCESSFUL'), this.translate.instant('SNACK_BAR_CLOSE'), {
          //   duration: 5000,
          // }); IS NEEDED FOR SUCCESSFUL LOGIN?
          this.router.navigate(['/account']);
        } else {
          this.snackBar.open('Unexpected response from server.', 'Close', {
            duration: 5000,
          });
        }
      },
      error: (err) => {
        const message = err?.error || 'Sign in failed.';
        this.snackBar.open(message, this.translate.instant('SNACK_BAR_CLOSE'), {
          duration: 5000,
        });
      }
    });
  }
}
