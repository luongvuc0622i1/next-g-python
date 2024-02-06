import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewsComponent } from './views/views.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfigComponent } from './modal/modal-config/modal-config.component';
import { TransferService } from './service/transfer.service';
import { PaginationComponent } from './pagination/pagination.component';
import { AllViewsComponent } from './all-views/all-views.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalSigninComponent } from './modal/modal-signin/modal-signin.component';
import { Auth_interceptor } from './service/auth_interceptor';
import { ModalSignupComponent } from './modal/modal-signup/modal-signup.component';
import { LandingComponent } from './landing/landing.component';
import { ModalNewPasswordComponent } from './modal/modal-new-password/modal-new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ViewsComponent,
    ModalConfigComponent,
    ModalSigninComponent,
    ModalSignupComponent,
    ModalNewPasswordComponent,
    PaginationComponent,
    AllViewsComponent,
    NavigationComponent,
    LandingComponent
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
