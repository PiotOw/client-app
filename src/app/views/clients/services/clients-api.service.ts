import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

import {Client} from '../../../models/client/client.model';

export class ClientsApiService {

  public getClients(): Observable<Client[]> {
    const savedClientsString: string | null = localStorage.getItem('savedClients');
    const clients: Client[] = savedClientsString ? JSON.parse(savedClientsString) : [];
    return of(
      clients
    ).pipe(delay(3000));
  }

  public addClients(newClients: Client[]): Observable<boolean> {
    const savedClientsString: string | null | undefined = localStorage.getItem('savedClients');
    if (savedClientsString) {
      const alreadySavedClients: Client[] = JSON.parse(savedClientsString);
      const clientsList: Client[] = [...alreadySavedClients, ...newClients];
      localStorage.setItem('savedClients', JSON.stringify(clientsList));
      return of(true);
    } else {
      localStorage.setItem('savedClients', JSON.stringify(newClients));
      return of(true);
    }

  }
}
