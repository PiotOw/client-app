import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {ClientsFormGuard} from './guards/clients-form.guard';
import {ClientsFormService} from './services/clients-form.service';
import {ClientsApiService} from './services/clients-api.service';

const routes: Routes = [
  {path: '', redirectTo: '/clients/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./views/clients-dashboard/clients-dashboard.module').then(m => m.ClientsDashboardModule),
    data: {
      depth: 0,
      pageTitle: 'Dashboard',
    },
  },
  {
    path: 'add',
    loadChildren: () => import('./views/add-clients-form/add-clients-form.module').then(m => m.AddClientsFormModule),
    data: {
      depth: 1,
      pageTitle: 'Dodaj klientów',
    },
    canDeactivate: [ClientsFormGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [
    ClientsFormGuard,
    ClientsFormService,
    ClientsApiService,
  ],
})
export class ClientsModule {
}
