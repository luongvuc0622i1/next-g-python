import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {
    path: 'page/:id',
    component: ViewsComponent
  },
  {
    path: '**',
    component: PagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }