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


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,

    RegisterComponent,
      VerifEmailComponent,
      ProfileComponent,
      RecupererComponent,
      DemandeupdateComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
      // ToastrModule added
  ],
  providers: [
    provideAnimations(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
