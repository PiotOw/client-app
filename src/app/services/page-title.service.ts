import {Injectable} from '@angular/core';
import {Router, ActivationStart, Event} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {

  private pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event) => {
        return event instanceof ActivationStart && event.snapshot.data.pageTitle !== this.pageTitle$.value;
      }))
      .subscribe(event => {
        if (event instanceof ActivationStart) {
          this.pageTitle$.next(event.snapshot.data.pageTitle);
        }
      });
  }

  public getPageTitle$(): Observable<string> {
    return this.pageTitle$.asObservable();
  }
}
