import {Injectable} from '@angular/core';

import {ClientsForm} from '../views/add-clients-form/models/clients-form.model';
import {Client} from '../../../models/client/client.model';

@Injectable()
export class ClientsFormService {
  private CLIENTS_FORM_LOCAL_STORAGE_KEY: string = 'CLIENTS_FORM_LOCAL_STORAGE_KEY';

  private isClientsFormFilled: boolean = false;

  constructor() {
  }

  public getIsClientsFormFilled(): boolean {
    return this.isClientsFormFilled;
  }

  public saveClientsFormData(formData: ClientsForm): void {
    this.isClientsFormFilled = formData.clients.some((clientData: Client) => {
      return clientData && Object.values(clientData).some(value => value);
    }) ?? false;
    localStorage.setItem(this.CLIENTS_FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }

  public resetClientsForm(): void {
    this.isClientsFormFilled = false;
    localStorage.removeItem(this.CLIENTS_FORM_LOCAL_STORAGE_KEY);
  }

  public getClientsFormData(): ClientsForm | null {
    const formDataString: string | null = localStorage.getItem(this.CLIENTS_FORM_LOCAL_STORAGE_KEY);
    localStorage.removeItem(this.CLIENTS_FORM_LOCAL_STORAGE_KEY);
    return formDataString ? JSON.parse(formDataString) : null;
  }

}
