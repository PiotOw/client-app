import {Component} from '@angular/core';
import {Router, ActivationStart, Event} from '@angular/router';

import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {

  public currentPageTitle: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event) => {
        return event instanceof ActivationStart && event.snapshot.data.pageTitle !== this.currentPageTitle;
      }))
      .subscribe(event => {
        if (event instanceof ActivationStart) {
          this.currentPageTitle = event.snapshot.data.pageTitle;
        }
      });
  }
}
