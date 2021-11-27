import {Injectable} from '@angular/core';

import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {ClientsModule} from '../clients.module';

@Injectable({
  providedIn: ClientsModule,
})

export class ClientsApiService {
  public getClients(): any {
    return of().pipe(delay(3000));
  }

  public addClients(): any {
    return of(true);
  }
}
