import {Component, OnInit} from '@angular/core';

import {PageTitleService} from '../../services/page-title.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  public currentPageTitle: string = '';

  constructor(private pageTitleService: PageTitleService) {
  }

  public ngOnInit(): void {
    this.pageTitleService.getPageTitle$().subscribe((pageTitle: string) => {
      this.currentPageTitle = pageTitle;
    });
  }

}
