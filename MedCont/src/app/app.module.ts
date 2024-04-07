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
import { PdfComponent } from './pdf/pdf.component';
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


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,

    RegisterComponent,
      VerifEmailComponent,
      ProfileComponent,
      RecupererComponent,
      DemandeupdateComponent,
      PdfComponent,
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

  ],
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
