import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  changePasswordForm: FormGroup;
  balance: number = 0;
  amountToAdd: number = 0;

  constructor(
    private accountService: AccountService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance() {
    this.accountService.getBalance().subscribe({
      next: (res) => {
        this.balance = res.balance;
      },
      error: () => {
        // Handle error (e.g., show message)
      }
    });
  }

  addBalance() {
    if (this.amountToAdd > 0) {
      this.accountService.addBalance(this.amountToAdd).subscribe({
        next: (res) => {
          this.amountToAdd = 0;
        },
        error: () => {
          // Handle error
        }
      });
    }
  }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.accountService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        this.snackBar.open(this.translate.instant('SNACK_BAR_CHANGE_PASSWORD_SUCCESSFUL'), this.translate.instant('SNACK_BAR_CLOSE'), {
          duration: 5000,
        });
      },
      error: (err) => {
        const message = this.accountService.parseErrorMessage(err.error) || 'Password change failed.';
        this.snackBar.open(message, this.translate.instant('SNACK_BAR_CLOSE'), {
          duration: 5000,
        });
      }
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.changePasswordForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

}
