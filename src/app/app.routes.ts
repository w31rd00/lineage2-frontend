import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BugReportComponent } from './bug-report/bug-report.component';

export const routes: Routes = [
    { path : '', component: LandingComponent},
    { path : 'sign-up', component: RegistrationComponent},
    { path : 'sign-in', component: LoginComponent},
    { path : 'account', component: AccountComponent, canActivate: [authGuard]},
    { path : 'forgot-password', component: ForgotPasswordComponent},
    { path : 'reset-password', component: ResetPasswordComponent},
    { path : 'bug-report', component: BugReportComponent }
];
