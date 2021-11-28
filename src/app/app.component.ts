import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {trigger, transition} from '@angular/animations';

import {slideHorizontally} from './animations/slide-animations';
import {Direction} from './models/direction.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':increment', slideHorizontally(Direction.LEFT)),
      transition(':decrement', slideHorizontally(Direction.RIGHT)),
    ]),
  ],
})
export class AppComponent {
  public getLoadedModuleDepth(routerOutlet: RouterOutlet): any {
    return routerOutlet?.activatedRouteData?.depth;
  }
}
