import { Component, OnInit } from '@angular/core';
import { ATournaments } from 'src/app/project/services/API/kupu/tournaments/ATournaments';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  teams!:any;
  constructor(private ATournament:ATournaments) { }

  ngOnInit(): void {
    const tournament = localStorage.getItem('Kupu-ActualTournament');
    if(tournament){
      let id = JSON.parse(tournament).id
      this.ATournament.getTeams(id).subscribe(teams => {
        if(teams.length > 0){
          const partitAcabat = localStorage.getItem('finishedMatch');
          if(partitAcabat) {
            this.teams = [
              {short_name: "LPT", win: 1, loss: 0, stars: 7 ,perc: 278 },
              {short_name: "LF", win: 0, loss: 1, stars: 6 ,perc: 251 },
              {short_name: "TE", win: 0, loss: 0, stars: 0 ,perc: 0 },
              {short_name: "NVI", win: 0, loss: 0, stars: 0 ,perc: 0 }
            ]
          }
        } else {
          this.teams = teams;
          let obj:any = [];
          teams.forEach((t:any) => {
            obj.push({short_name: t.abr, win: 0, loss: 0, stars: 0 ,perc: 0});
          })
          this.teams = obj;

        }
      })
    }
  }

  changeRanking(clicked:HTMLElement, list:HTMLElement){
    if(!clicked.classList.contains('active')){
      list.querySelectorAll('.rankingOption').forEach(o => o.classList.remove('active'));
      clicked.classList.add('active');
    }
  }
}
