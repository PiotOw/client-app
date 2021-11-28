import {Component, OnInit} from '@angular/core';

import {ClientsApiService} from '../../services/clients-api.service';
import {Client} from '../../../../models/client/client.model';

@Component({
  selector: 'app-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.scss'],
})
export class ClientsDashboardComponent implements OnInit {

  public clients: Client[] | undefined;

  constructor(private clientsApiService: ClientsApiService) {
  }

  public ngOnInit(): void {
    this.clientsApiService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

}
