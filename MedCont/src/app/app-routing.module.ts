import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ProfileComponent } from './profile/profile.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { DemandeupdateComponent } from './demandeupdate/demandeupdate.component';

import { PdfRCDntComponent } from './pdf-r-c-dnt/pdf-r-c-dnt.component';
import { PdfRCOpComponent } from './pdf-r-c-op/pdf-r-c-op.component';
import { FactOptComponent } from './fact-opt/fact-opt.component';
import { HomeComponent } from './home/home.component';
import { SendDocComponent } from './send-doc/send-doc.component';
import { ListDocsAffComponent } from './list-docs-aff/list-docs-aff.component';

import { DetailDocComponent } from './detail-doc/detail-doc.component';

import { HistoriqueComponent } from './historique/historique.component';
import { BodereauDentisteComponent } from './bodereau-dentiste/bodereau-dentiste.component';
import { BodereauOpticienComponent } from './bodereau-opticien/bodereau-opticien.component';
import { BodereauOpticienPRATICIENComponent } from './bodereau-opticien-praticien/bodereau-opticien-praticien.component';
import { EtatDocComponent } from './etat-doc/etat-doc.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { TestComponent } from './test/test.component';
import { DocumentProcessedComponent } from './document-processed/document-processed.component';
import { DetailDocProcessedComponent } from './detail-doc-processed/detail-doc-processed.component';
import { ListDocsFactComponent } from './list-docs-fact/list-docs-fact.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'verifEmail',component:VerifEmailComponent},
  {path:'profile',component:ProfileComponent},
  {path:'',component:ProfileComponent},
  {path:'recuperer',component:RecupererComponent},
  {path:'demupdate',component:DemandeupdateComponent},
  {path:'test',component:TestComponent},
  {path:'RCdent/:id',component:PdfRCDntComponent},
  {path:'RCopt/:id',component:PdfRCOpComponent},
  {path:'fctopt',component:FactOptComponent},
  {path:'home',component:HomeComponent},
  {path:'senddoc',component:SendDocComponent},
  {path:'mesDocs',component:ListDocsAffComponent},
  {path:'detailDoc/:id',component:DetailDocComponent},
  {path:'detailDocProc/:id',component:DetailDocProcessedComponent},
  {path:'historique',component:HistoriqueComponent},
  {path:'brdDnt',component:BodereauDentisteComponent},
  {path:'brdOpt',component:BodereauOpticienComponent},
  {path:'brdOptPRATICIEN',component:BodereauOpticienPRATICIENComponent},
  {path:'etatDoc',component:EtatDocComponent},
  {path:'allUsers',component:ListeUsersComponent},
  {path:'processedDocs',component:DocumentProcessedComponent},
  {path:'docsFact',component:ListDocsFactComponent},
  {path:'listFact',component:ListFactureComponent},
  {path:'listReclamations',component:ReclamationComponent},
  {path:'Reclamation',component:AddReclamationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
