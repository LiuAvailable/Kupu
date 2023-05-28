import { Component, OnInit } from '@angular/core';
import { ATournaments } from 'src/app/project/services/API/kupu/tournaments/ATournaments';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  team!:any;
  org!:boolean;
  constructor(private ATournament:ATournaments) { }

  ngOnInit(): void {
    const team = localStorage.getItem('kupu-MyTeam')
    this.team = team;
    const ActualTournament = localStorage.getItem('Kupu-ActualTournament');
    if (ActualTournament){
      let org = JSON.parse(ActualTournament).org;
      if(org == 'true') this.org = true;
      else this.org = false;
    }
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
    if(name.value!='' && abrev.value!='' && playerList.length > 0 && teamTag.value){
      const tourament = localStorage.getItem('Kupu-ActualTournament')
      const user = localStorage.getItem('KupuUser')
      console.log('AAAAAAAAAA')
      if(tourament && user){
        console.log('BBBBBB')
        let userObj = JSON.parse(user)
        // userObj = userObj.find((u:any) => u.nivel == '15')
        userObj = userObj[0].user;
        let tournamentObj = JSON.parse(tourament)
        const team = {name:name.value, abrev:abrev.value, playerList, tournament:tournamentObj.id, teamId:userObj, teamTag:teamTag.value};
        this.ATournament.newTeam(team).subscribe(data => {
          console.log(data);
          if(data.data == 'OK') {
            localStorage.setItem('kupu-MyTeam', JSON.stringify(team));
            this.team = team;
          }
        })
      }
    } else console.log(teamTag)
  }

  generateMatches(){
    let tournament = localStorage.getItem('Kupu-ActualTournament');
    if(tournament) {
      let id = JSON.parse(tournament).id

      let teams:any = [];
      try{
        this.ATournament.getTeams(id).subscribe(data => {
          data.forEach((t:any) => {
            teams.push(t.id);
          })
          this.leagueFormat(teams, id);
        });
      } catch(e){console.log(e);}
    }
  }

  leagueFormat(teams:any, id:string){
    const matches = [];
    for(let i=0; i< teams.length; i++){
      let x = i+1;
      while(x < teams.length){
        matches.push({team:teams[i], opponent:teams[x]})
        x++;
      }
    }
    console.log({id, matches})
  }


  playoffFormat(){
    const teams = 4;
    const rounds = Math.log(teams) / Math.log(2);

    for (let i = 1; i < rounds+1; i++){
      const partides = teams/(2**i)
      let next_match = 1;
      console.log(`--------- ROUND: ${i} ---------`);
      for (let j = 1; j < partides+1; j++){
        console.log(`match: R${i}-${j}, next: R${i+1}-${next_match}`)
        if(j%2 == 0) next_match++;
      }
    }
  }
}

/**
 * #0V33ZAD
#0V33ZAT
#0V33ZAU
 */

