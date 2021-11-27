import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {slideInAnimation} from './animations/slide-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation,
  ],
})
export class AppComponent {
  public title: string = 'billtech';

  public getLoadedModuleDepth(routerOutlet: RouterOutlet): any {
    return routerOutlet?.activatedRouteData?.depth;
  }
}
