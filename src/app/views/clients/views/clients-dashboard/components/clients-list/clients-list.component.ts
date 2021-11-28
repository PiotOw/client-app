import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

import {Client} from '../../../../../../models/client/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsListComponent implements OnInit {

  @Input() public clients: Client[] = [];

  constructor() {
  }

  public ngOnInit(): void {
  }

}
