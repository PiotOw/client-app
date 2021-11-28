import {Injectable} from '@angular/core';

import {of, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

import {Client} from '../../../../models/client/client.model';
import {ClientsApiService} from './clients-api.service';

@Injectable()
export class ClientsApiLocalStorageService extends ClientsApiService {
  private SAVED_CLIENTS_LOCAL_STORAGE_KEY: string = 'SAVED_CLIENTS_LOCAL_STORAGE_KEY';

  public getClients(): Observable<Client[]> {
    const savedClientsString: string | null = localStorage.getItem(this.SAVED_CLIENTS_LOCAL_STORAGE_KEY);
    const clients: Client[] = savedClientsString ? JSON.parse(savedClientsString) : [];
    return of(
      clients
    ).pipe(delay(3000));
  }

  public addClients(newClients: Client[]): Observable<boolean> {
    const savedClientsString: string | null | undefined =
      localStorage.getItem(this.SAVED_CLIENTS_LOCAL_STORAGE_KEY);
    if (savedClientsString) {
      const alreadySavedClients: Client[] = JSON.parse(savedClientsString);
      const clientsList: Client[] = [...alreadySavedClients, ...newClients];
      localStorage.setItem(this.SAVED_CLIENTS_LOCAL_STORAGE_KEY, JSON.stringify(clientsList));
      return of(true);
    } else {
      localStorage.setItem(this.SAVED_CLIENTS_LOCAL_STORAGE_KEY, JSON.stringify(newClients));
      return of(true);
    }

  }
}
