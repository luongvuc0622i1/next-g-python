import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ViewsComponent } from './views/views.component';
import { AllViewsComponent } from './all-views/all-views.component';
import { AuthGuard } from './service/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {
    path: 'page/:id', canActivate: [AuthGuard],
    component: ViewsComponent
  },
  {
    path: 'config', canActivate: [AuthGuard],
    component: PagesComponent
  },
  {
    path: 'accounts', canActivate: [AuthGuard],
    component: AccountsComponent
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: AllViewsComponent
  },
  {
    path: 'changePassword',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }