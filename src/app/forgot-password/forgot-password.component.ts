import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private translate: TranslateService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.authService.requestPasswordReset(this.forgotForm.value.email).subscribe({
        next: () => {
          this.translate.get('RESET_LINK_SENT').subscribe((translated) => {
            this.message = translated;
          });
          this.error = '';
        },
        error: () => {
          this.translate.get('RESET_LINK_SENT_ERROR').subscribe((translated) => {
            this.error = translated;
          });
          this.message = '';
        }
      });
    }
  }

}
