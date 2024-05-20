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
import { StatsticComponent } from './statstic/statstic.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { adminGuard } from './admin.guard';
import { agentGuard } from './agent.guard';
import { userGuard } from './user.guard';
import { roleGuard } from './role.guard';
import { adminUserGuard } from './admin-user.guard';
import { adminagentGuard } from './adminagent.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' }},
  {path:'register',component:RegisterComponent, data: { breadcrumb: 'Inscription' }},
  {path:'verifEmail',component:VerifEmailComponent, data: { breadcrumb: 'Verification' }},
  {path:'profile',component:ProfileComponent, data: { breadcrumb: 'Profile' }, canActivate:[roleGuard]},
  {path:'',component:ProfileComponent, data: { breadcrumb: 'Profile' }, canActivate:[roleGuard]},
  {path:'recuperer',component:RecupererComponent, data: { breadcrumb: 'Recuperer compte' }},
  {path:'demupdate',component:DemandeupdateComponent, data: { breadcrumb: 'Liste des demandes' }, canActivate:[adminGuard]},
  {path:'RCdent/:id',component:PdfRCDntComponent , data: { breadcrumb: 'Rapport Dentaire' }, canActivate:[adminUserGuard]},
  {path:'RCopt/:id',component:PdfRCOpComponent, data: { breadcrumb: 'Rapport Optique' }, canActivate:[adminUserGuard]},
  {path:'fctopt',component:FactOptComponent, data: { breadcrumb: 'Facture' }, canActivate:[adminUserGuard]},
  {path:'home',component:HomeComponent,data: { breadcrumb: 'Tous les dossiers à traiter' }, canActivate:[adminGuard]},
  {path:'senddoc',component:SendDocComponent, data: { breadcrumb: 'Affecter un dossier' }, canActivate:[adminagentGuard]},
  {path:'mesDocs',component:ListDocsAffComponent , data: { breadcrumb: 'Dossiers à traiter' }, canActivate:[adminUserGuard]},
  {path:'detailDoc/:id',component:DetailDocComponent, data: { breadcrumb: 'Consulter Dossier' }, canActivate:[roleGuard]},
  {path:'detailDocProc/:id',component:DetailDocProcessedComponent, data: { breadcrumb: 'Consulter Dossier' }, canActivate:[roleGuard]},
  {path:'historique',component:HistoriqueComponent , data: { breadcrumb: 'Historique' }, canActivate:[adminGuard]},
  {path:'brdDnt',component:BodereauDentisteComponent , data: { breadcrumb: 'Bordereau Dentaire' }, canActivate:[adminUserGuard]},
  {path:'brdOpt',component:BodereauOpticienComponent, data: { breadcrumb: 'Bordereau Optique' }, canActivate:[adminUserGuard]},
  {path:'etatDoc',component:EtatDocComponent, data: { breadcrumb: 'Suivi des dossiers' }, canActivate:[adminagentGuard]},
  {path:'allUsers',component:ListeUsersComponent, data: { breadcrumb: 'Liste des utilisateurs' }, canActivate:[adminGuard]},
  {path:'processedDocs',component:DocumentProcessedComponent, data: { breadcrumb: 'Dossiers traités' }, canActivate:[adminUserGuard]},
  {path:'docsFact',component:ListDocsFactComponent, data: { breadcrumb: 'Liste des factures' }, canActivate:[adminagentGuard]},
  {path:'listFact',component:ListFactureComponent, data: { breadcrumb: 'Mes Factures' }, canActivate:[adminUserGuard]},
  {path:'listReclamations',component:ReclamationComponent, data: { breadcrumb: 'Liste des réclamations' }, canActivate:[adminagentGuard]},
  {path:'Reclamation',component:AddReclamationComponent, data: { breadcrumb: 'Réclamer' }, canActivate:[userGuard]},
  {path:'stat',component:StatsticComponent, canActivate:[adminUserGuard]},
  {path:  'app-forbidden', component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
