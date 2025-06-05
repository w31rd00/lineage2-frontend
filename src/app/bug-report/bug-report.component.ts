import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpService } from '../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-bug-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './bug-report.component.html',
  styleUrl: './bug-report.component.css'
})
export class BugReportComponent {

  bugReportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private utilityService: UtilityService
  ) {
    this.bugReportForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  submitBug(): void {
    if (this.bugReportForm.invalid) {
      this.bugReportForm.markAllAsTouched();
      return;
    }

    this.httpService.submitBugReport(this.bugReportForm.value).subscribe({
      next: (res) => {
        this.snackBar.open(this.translate.instant('BUG_REPORT_SUCCESSFUL'), this.translate.instant('SNACK_BAR_CLOSE'), {
          duration: 5000,
        });
      },
      error: (err) => {
        const message = this.utilityService.parseErrorMessage(err.error) || 'Bug reporting failed.';
        this.snackBar.open(message, this.translate.instant('SNACK_BAR_CLOSE'), {
          duration: 5000,
        });
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.bugReportForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

}
