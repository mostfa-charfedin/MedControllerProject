import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifEmailComponent } from './verif-email/verif-email.component';

import { provideAnimations } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { DemandeupdateComponent } from './demandeupdate/demandeupdate.component';

import { PdfRCDntComponent } from './pdf-r-c-dnt/pdf-r-c-dnt.component';
import { PdfRCOpComponent } from './pdf-r-c-op/pdf-r-c-op.component';
import { FactOptComponent } from './fact-opt/fact-opt.component';
import {MatSelectModule} from '@angular/material/select';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { SendDocComponent } from './send-doc/send-doc.component';
import { ListDocsAffComponent } from './list-docs-aff/list-docs-aff.component';

import { NgxPrintModule } from 'ngx-print';
import { DetailDocComponent } from './detail-doc/detail-doc.component';

import { HistoriqueComponent } from './historique/historique.component';
import { BodereauDentisteComponent } from './bodereau-dentiste/bodereau-dentiste.component';
import { BodereauOpticienComponent } from './bodereau-opticien/bodereau-opticien.component';
import { BodereauOpticienPRATICIENComponent } from './bodereau-opticien-praticien/bodereau-opticien-praticien.component';
import { EtatDocComponent } from './etat-doc/etat-doc.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { TestComponent } from './test/test.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { DocumentProcessedComponent } from './document-processed/document-processed.component';
import { DetailDocProcessedComponent } from './detail-doc-processed/detail-doc-processed.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ListDocsFactComponent } from './list-docs-fact/list-docs-fact.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { StatsticComponent } from './statstic/statstic.component';
import { ChartModule } from 'primeng/chart';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,

    RegisterComponent,
      VerifEmailComponent,
      ProfileComponent,
      RecupererComponent,
      DemandeupdateComponent,

      PdfRCDntComponent,
      PdfRCOpComponent,
      FactOptComponent,
      HomeComponent,
      SendDocComponent,
      ListDocsAffComponent,

      DetailDocComponent,

      HistoriqueComponent,
      BodereauDentisteComponent,
      BodereauOpticienComponent,
      BodereauOpticienPRATICIENComponent,
      EtatDocComponent,
      ListeUsersComponent,
      TestComponent,
      DocumentProcessedComponent,
      DetailDocProcessedComponent,
      ListDocsFactComponent,
      ListFactureComponent,
      ReclamationComponent,
      AddReclamationComponent,
      StatsticComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    NgxPrintModule,
    MatStepperModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ChartModule,
    MatCheckboxModule,
  ],
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
