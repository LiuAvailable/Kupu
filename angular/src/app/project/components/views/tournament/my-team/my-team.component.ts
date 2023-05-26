import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  team!:any;
  constructor() { }

  ngOnInit(): void {
    const team = localStorage.getItem('kupu-MyTeam')
    this.team = team;
  }

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


  inscribe(name:any, abrev:any, teamTag:any, players:any){
    let playerList:any = [];
    players.querySelectorAll('input').forEach((i:any) => {
      let playerTag = i.value;
      if(playerTag) playerList.push(playerTag);
    })
    if(name.value!='' && abrev.value!='' && playerList.length > 4 && teamTag.value){
      const tourament = localStorage.getItem('Kupu-ActualTournament')
      const user = localStorage.getItem('KupuUser')
      if(tourament && user){
        let userObj = JSON.parse(user)
        userObj = userObj.find((u:any) => u.nivel == '15')
        userObj = userObj.user;
        let tournamentObj = JSON.parse(tourament)
        console.log({name:name.value, abrev:abrev.value, playerList, tournament:tournamentObj.id, teamId:userObj, teamTag:teamTag.value})
      }
    } else console.log(teamTag)
  }
}
