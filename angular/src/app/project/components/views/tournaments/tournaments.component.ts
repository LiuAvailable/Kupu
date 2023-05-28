import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUsers } from 'src/app/project/services/API/kupu/users/AUsers';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments:Array<any> = [];
  constructor(private router:Router, private Auser:AUsers) { }

  ngOnInit(): void {
    const tournaments = localStorage.getItem('KupuTournaments');
    if(tournaments) {
      JSON.parse(tournaments).forEach((t: any) => this.tournaments.push(t));
    }
  }

  createTournament(){
    this.router.navigate(['tournaments/create']);
  }

  async goToTournament(id:string){
    let user:any = localStorage.getItem('KupuUser');
    if(user){
      user = JSON.parse(user)
      //user = user.find((u:any) => u.nivel == '15')
      user = user[0].user;
    } 

    this.Auser.getTournamentTeam(id, user).subscribe( data => {
      console.log(data);
      this.saveActualTournament(id);
      this.router.navigate(['tournament/myteam']);
    },
    error => {
      if (error.status === 404) {
        this.saveActualTournament(id);
        this.router.navigate(['tournament/myteam']);
      }
    });
  }

  saveActualTournament(id:string){
    let tournaments:any = localStorage.getItem('KupuUserTournaments');
    if(tournaments){
      let tournamentsObj = JSON.parse(tournaments)
      console.log(tournamentsObj);
      console.log(id)
      let org = tournamentsObj.find((tnmt:any) => tnmt.idTournament === id);
      console.log(org)
      if(!org) org = 'false';
      else org = 'true';
      console.log(org)
      localStorage.setItem('Kupu-ActualTournament', JSON.stringify({id, org}));
    } else localStorage.setItem('Kupu-ActualTournament', JSON.stringify({id, org:'false'}));
  }
}
