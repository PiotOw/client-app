import {Component, OnDestroy} from '@angular/core';
import {Router, ActivationStart, Event} from '@angular/router';

import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public currentPageTitle: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event) => {
        return event instanceof ActivationStart && event.snapshot.data.pageTitle !== this.currentPageTitle;
      }),
      takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof ActivationStart) {
          this.currentPageTitle = event.snapshot.data.pageTitle;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
