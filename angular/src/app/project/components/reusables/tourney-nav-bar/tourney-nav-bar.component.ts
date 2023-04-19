import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-tourney-nav-bar',
  templateUrl: './tourney-nav-bar.component.html',
  styleUrls: ['./tourney-nav-bar.component.css']
})
export class TourneyNavBarComponent {

  constructor() { 
  }

  darkMode():boolean {
    let bool = false;
    let body:HTMLElement|null = document.querySelector('body');
    if(body) body.classList.contains('darkMode') ? bool = true : false;
    return bool;
  }

  formatNavBar(navBar:HTMLElement, className:string):void {
    if(navBar.classList.contains(className)) navBar.classList.remove(className)
    else navBar.classList.contains('hidden') ? '' : navBar.classList.add(className)
  }
}
