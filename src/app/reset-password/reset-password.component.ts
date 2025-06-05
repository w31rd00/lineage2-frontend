import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  resetForm: FormGroup;
  error: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      const { newPassword, confirmPassword } = this.resetForm.value;
  
      if (newPassword !== confirmPassword) {
        // Handle mismatch
        return;
      }
  
      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.snackBar.open(this.translate.instant('SNACK_BAR_RESET_PASSWORD_SUCCESSFUL'), this.translate.instant('SNACK_BAR_CLOSE'), {
            duration: 5000,
          });
        },
        error: (err) => {
          this.snackBar.open(this.authService.parseErrorMessage(err.error), this.translate.instant('SNACK_BAR_CLOSE'), {
            duration: 5000,
          });
        }
      });
    }
  }

}
