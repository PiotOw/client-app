import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {ClientsDashboardComponent} from './clients-dashboard.component';
import {ClientsListComponent} from './components/clients-list/clients-list.component';
import {ClientsListRowComponent} from './components/clients-list-row/clients-list-row.component';

const routes: Routes = [
  {path: '', component: ClientsDashboardComponent},
];

@NgModule({
  declarations: [ClientsDashboardComponent, ClientsListComponent, ClientsListRowComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ClientsDashboardModule {
}
