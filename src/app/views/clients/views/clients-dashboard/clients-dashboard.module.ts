import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

import {ClientsDashboardComponent} from './clients-dashboard.component';
import {ClientsListComponent} from './components/clients-list/clients-list.component';

const routes: Routes = [
  {path: '', component: ClientsDashboardComponent},
];

@NgModule({
  declarations: [ClientsDashboardComponent, ClientsListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
  ],
})
export class ClientsDashboardModule {
}
