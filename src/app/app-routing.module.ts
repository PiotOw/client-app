import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/clients/dashboard', pathMatch: 'full'},
  {path: 'clients', loadChildren: () => import('./views/clients/clients.module').then(m => m.ClientsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
