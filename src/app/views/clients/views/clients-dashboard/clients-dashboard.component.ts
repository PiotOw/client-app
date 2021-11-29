import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Client} from '../../../../models/client/client.model';
import {ClientsApiService} from '../../services/clients-api/clients-api.service';

@Component({
  selector: 'app-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.scss'],
})
export class ClientsDashboardComponent implements OnInit, OnDestroy {

  public clients: Client[] | undefined;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private clientsApiService: ClientsApiService) {
  }

  public ngOnInit(): void {
    this.clientsApiService.getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
