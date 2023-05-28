import { Component, OnInit } from '@angular/core';
import { ATournaments } from 'src/app/project/services/API/kupu/tournaments/ATournaments';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams:any = []
  constructor(private ATournament:ATournaments) { }

  ngOnInit(): void {
    const tournament = localStorage.getItem('Kupu-ActualTournament');
    if(tournament){
      let id = JSON.parse(tournament).id
      this.ATournament.getTeams(id).subscribe(teams => {
        if(teams.length > 0) this.teams = teams;
      })
    }
  }

}
