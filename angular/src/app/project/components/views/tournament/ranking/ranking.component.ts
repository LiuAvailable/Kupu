import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  constructor() { }

  changeRanking(clicked:HTMLElement, list:HTMLElement){
    if(!clicked.classList.contains('active')){
      list.querySelectorAll('.rankingOption').forEach(o => o.classList.remove('active'));
      clicked.classList.add('active');
    }
  }
}
