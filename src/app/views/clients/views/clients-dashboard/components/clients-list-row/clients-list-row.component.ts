import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {Client} from '../../../../../../models/client/client.model';

@Component({
  selector: 'app-clients-list-row',
  templateUrl: './clients-list-row.component.html',
  styleUrls: ['./clients-list-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsListRowComponent {

  @Input() public client: Client | undefined;
  @Input() public last: boolean | undefined;

}
