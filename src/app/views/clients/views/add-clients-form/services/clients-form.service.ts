import {Injectable} from '@angular/core';

import {ClientsForm} from '../models/clients-form.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsFormService {

  constructor() {
  }

  public saveClientsFormData(formData: ClientsForm): void {
    localStorage.setItem('clientsFormState', JSON.stringify(formData));
  }

  public getClientsFormData(): ClientsForm | null {
    const formDataString: string | null = localStorage.getItem('clientsForm');
    return formDataString ? JSON.parse(formDataString) : null;
  }

}
