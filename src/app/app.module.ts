import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewsComponent } from './views/views.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfigComponent } from './modal-config/modal-config.component';
import { TransferService } from './service/transfer.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ViewsComponent,
    ModalConfigComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
