import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {AddClientsFormComponent} from './add-clients-form.component';
import {ClientFormRowComponent} from './components/client-form-row/client-form-row.component';

const routes: Routes = [
  {path: '', component: AddClientsFormComponent},
];

@NgModule({
  declarations: [AddClientsFormComponent, ClientFormRowComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class AddClientsFormModule {
}
