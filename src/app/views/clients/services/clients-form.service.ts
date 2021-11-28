import {ClientsForm} from '../views/add-clients-form/models/clients-form.model';
import {Client} from '../../../models/client/client.model';

export class ClientsFormService {

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
    localStorage.setItem('clientsForm', JSON.stringify(formData));
  }

  public resetClientsForm(): void {
    this.isClientsFormFilled = false;
    localStorage.removeItem('clientsForm');
  }

  public getClientsFormData(): ClientsForm | null {
    const formDataString: string | null = localStorage.getItem('clientsForm');
    localStorage.removeItem('clientsForm');
    return formDataString ? JSON.parse(formDataString) : null;
  }

}
