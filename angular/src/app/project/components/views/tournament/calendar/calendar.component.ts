import { Component, OnInit } from '@angular/core';
import { ATournaments } from 'src/app/project/services/API/kupu/tournaments/ATournaments';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  matches!:any;
  constructor(private ATournament:ATournaments) { }

  ngOnInit(): void {
    const tournament = localStorage.getItem('Kupu-ActualTournament');
    if(tournament){
      const id = JSON.parse(tournament).id;

      this.ATournament.getMatches(id).subscribe(matches => {
        this.matches = matches;
        console.log(matches);

        
        const match = localStorage.getItem('finishedMatch');
        if(match){
          this.matches[0].stars = 7
          this.matches[0].percentage = 278
          this.matches[0].opponent_stars = 6
          this.matches[0].opponent_percentage = 251
        }
      })
    }
  }

  finishMatch(){ localStorage.setItem('finishedMatch', 'true'); }
}
