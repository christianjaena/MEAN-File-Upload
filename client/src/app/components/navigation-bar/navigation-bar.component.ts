import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  title: string = 'Theses';

  constructor(location: Location, router: Router) {
    router.events.subscribe(() => {
      switch (location.path()) {
        case '/theses':
          this.title = 'Theses';
          break;
        case '/addThesis':
          this.title = 'Add Thesis';
          break;
      }
    });
  }
}
