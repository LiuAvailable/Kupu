import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments:Array<any> = [];
  constructor(private router:Router) { }

  ngOnInit(): void {
    const tournaments = localStorage.getItem('KupuTournaments');
    if(tournaments) {
      JSON.parse(tournaments).forEach((t: any) => this.tournaments.push({id:t.id, name:t.name, description:t.description}));
    }

    console.log(this.tournaments)
  }
  createTournament(){
    this.router.navigate(['tournaments/create']);
  }

}
