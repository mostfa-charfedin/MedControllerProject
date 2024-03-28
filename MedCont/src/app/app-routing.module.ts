import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ProfileComponent } from './profile/profile.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { DemandeupdateComponent } from './demandeupdate/demandeupdate.component';
import { PdfComponent } from './pdf/pdf.component';
import { PdfRCDntComponent } from './pdf-r-c-dnt/pdf-r-c-dnt.component';
import { PdfRCOpComponent } from './pdf-r-c-op/pdf-r-c-op.component';
import { FactOptComponent } from './fact-opt/fact-opt.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'verifEmail',component:VerifEmailComponent},
  {path:'profile',component:ProfileComponent},
  {path:'recuperer',component:RecupererComponent},
  {path:'demupdate',component:DemandeupdateComponent},
  {path:'pdf',component:PdfComponent},
  {path:'RCdent',component:PdfRCDntComponent},
  {path:'RCopt',component:PdfRCOpComponent},
  {path:'fctopt',component:FactOptComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
