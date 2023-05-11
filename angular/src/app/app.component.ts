import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kupu';
  navBar=0; 

  constructor(private router: Router) {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualizarNavegacion();
      }
    });
  }

  actualizarNavegacion() {
    const rutaActual = this.router.url;
    
    if (rutaActual.includes('tournament/')) {
      this.navBar = 1;
    } else if(!rutaActual.includes('/login') && !rutaActual.includes('create'))this.navBar = 2;
    else this.navBar = 0;
  }
}
