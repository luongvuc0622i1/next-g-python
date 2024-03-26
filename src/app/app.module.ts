import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfigComponent } from './modal/modal-config/modal-config.component';
import { TransferService } from './service/transfer.service';
import { PaginationComponent } from './pagination/pagination.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Auth_interceptor } from './service/auth_interceptor';
import { ModalSignupComponent } from './modal/modal-signup/modal-signup.component';
import { LandingComponent } from './landing/landing.component';
import { ModalNewPasswordComponent } from './modal/modal-new-password/modal-new-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BdsAllComponent } from './data/bdsAll/bdsAll.component';
import { BdsDetailComponent } from './data/bdsDetail/bdsDetail.component';
import { AutoAllComponent } from './data/autoAll/autoAll.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';
import { AutoDetailComponent } from './data/autoDetail/autoDetail.component';

@NgModule({
  declarations: [
    AppComponent,
    BdsAllComponent,
    BdsDetailComponent,
    AutoAllComponent,
    AutoDetailComponent,
    ConfigurationComponent,
    ModalConfigComponent,
    ModalDeleteComponent,
    ModalSignupComponent,
    ModalNewPasswordComponent,
    PaginationComponent,
    NavigationComponent,
    LandingComponent,
    AccountsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth_interceptor,
      multi: true
    },
    TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
