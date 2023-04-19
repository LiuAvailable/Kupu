import { Component } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent {

  constructor() { }

  changeRooster(clicked:HTMLElement, other:HTMLElement, className:string){
    if(!clicked.classList.contains('active')){
      clicked.classList.add('active');
      other.classList.remove('active');

      document.querySelectorAll(".statistics, .profile").forEach(e => {
        e.classList.add('hide');
        e.classList.contains(className) ? e.classList.remove('hide') : ''
      })
    }
  }
}
