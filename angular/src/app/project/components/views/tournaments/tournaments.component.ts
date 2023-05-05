import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/project/model/implementations/kupu/Tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments:Array<Tournament> = [];
  constructor() { }

  ngOnInit(): void {
    const tournaments = localStorage.getItem('KupuTournaments');
    if(tournaments) {
      JSON.parse(tournaments).forEach((t: any) => this.tournaments.push(new Tournament(t.id, t.name, t.description)))
    }

    console.log(this.tournaments)
  }

}
