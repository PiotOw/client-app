import {Observable} from 'rxjs';

import {Client} from '../../../../models/client/client.model';

export abstract class ClientsApiService {
  public abstract getClients(): Observable<Client[]>;
  public abstract addClients(newClients: Client[]): Observable<boolean>;
}
