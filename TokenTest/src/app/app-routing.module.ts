import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {PermissionsService} from './services/permissions.service';
import { GoalViewComponent } from './goal-view/goal-view.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent,canActivate: [PermissionsService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'home', component: HomeComponent, canActivate: [PermissionsService]},
  {path: 'student-view', component: StudentViewComponent,   canActivate: [PermissionsService]},
  {path: 'goal-view', component: GoalViewComponent , canActivate: [PermissionsService]},
  {path: 'students', component: StudentListComponent, canActivate: [PermissionsService]},
  {path: 'verify-account', component: VerifyAccountComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
