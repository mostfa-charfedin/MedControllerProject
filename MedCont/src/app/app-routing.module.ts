import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ProfileComponent } from './profile/profile.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { DemandeupdateComponent } from './demandeupdate/demandeupdate.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'verifEmail',component:VerifEmailComponent},
  {path:'profile',component:ProfileComponent},
  {path:'recuperer',component:RecupererComponent},
  {path:'demupdate',component:DemandeupdateComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
