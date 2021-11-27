import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/clients/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./views/clients-dashboard/clients-dashboard.module').then(m => m.ClientsDashboardModule),
    data: {depth: 0},
  },
  {
    path: 'add',
    loadChildren: () => import('./views/add-clients-form/add-clients-form.module').then(m => m.AddClientsFormModule),
    data: {depth: 1},
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
})
export class ClientsModule {
}
