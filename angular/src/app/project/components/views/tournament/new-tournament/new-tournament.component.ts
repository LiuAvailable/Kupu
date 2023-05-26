import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/project/model/implementations/kupu/tournament/Tournament';
import { Tournament_fase } from 'src/app/project/model/implementations/kupu/tournament/Tournament_fase';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent {
  creationIndex: number = 1;
  statePriv:boolean = false;
  fase:number = 2;

  tournament!: Tournament

  constructor() {this.createPlayoff() }
  substract(){this.creationIndex=this.creationIndex-1;}
  sum(){ this.creationIndex=this.creationIndex+1; }

  setState(select:any){
    if(select.value == 'Privado') this.statePriv = true;
    else this.statePriv = false;
  }


  checkSum(){
    switch(this.creationIndex){
      case 1:
        this.sumFormulari1();
        break;
      case 2:
        this.sumFormulari2();
        break;
      default:
        break;
    }
  }

  checkSubstract(){
    this.substract();
    switch(this.creationIndex){
      case 1:
        setTimeout(() => this.substractFrom1(),50);
        break;
    }
  }
  substractFrom1(){
    const form = document.querySelector('.form.first');
    if(this.tournament){
      if(form){
        let name = (form.querySelector("input[name='name']") as HTMLInputElement)
        name.value = this.tournament.name;
        (name.parentNode as HTMLElement).classList.add('focus');
        let descripcio = (form.querySelector("textarea") as any)
        descripcio.value = this.tournament.descripcio;
        (descripcio.parentNode as HTMLElement).classList.add('focus');
        (form.querySelector("input[name='numPlayers_team']") as HTMLInputElement).value = (this.tournament.numPlayers_team).toString();
        (form.querySelector("input[name='time_format']") as HTMLInputElement).value = this.tournament.time_format;
      }
    }
  }
  sumFormulari1() {
    
    const form = document.querySelector('.form.first');
      
    const formElements: Array<{ name: string, HTMLelement: Element | null  }> = [];
  
    if (form) {
      formElements.push({ name: 'name', HTMLelement: form.querySelector("input[name='name']") });
      formElements.push({ name: 'description', HTMLelement: form.querySelector("textarea") });
      formElements.push({ name: 'numPlayers_team', HTMLelement: form.querySelector("input[name='numPlayers_team']") });
      formElements.push({ name: 'time_format', HTMLelement: form.querySelector("input[name='time_format']") });
      formElements.push({ name: 'state', HTMLelement: form.querySelector("select") });

      if(form.querySelector('select')?.value === 'Privado') {
        formElements.push({ name: 'code', HTMLelement: form.querySelector("input[name='privCode'")})
        formElements.push({ name: 'password', HTMLelement: form.querySelector("input[name='privPassword'")})
      }
      let correct = true;
      formElements.forEach(e => {
        if (e.HTMLelement && (e.HTMLelement as HTMLInputElement).value) {
          (e.HTMLelement.parentNode as HTMLElement).classList.remove('error');
        } else if (e.HTMLelement) {
          correct = false;
          (e.HTMLelement.parentNode as HTMLElement).classList.add('error');
        }
      });
      if(correct){
        this.sum();
        let name = (form.querySelector("input[name='name']") as HTMLInputElement)?.value;
        let descripcio = (form.querySelector("textarea") as any)?.value;
        let numPlayers_team = (form.querySelector("input[name='numPlayers_team']") as HTMLInputElement)?.value;
        let time_format = (form.querySelector("input[name='time_format']") as HTMLInputElement)?.value;

        if(name && descripcio && numPlayers_team && time_format) this.tournament = new Tournament(name, descripcio, parseInt(numPlayers_team), time_format);
      }
    }
  }


  dropdownAction(dropdownCard:any){
    if(dropdownCard.classList.contains("active")) dropdownCard.classList.remove("active")
    else {
      document.querySelectorAll(".dopdrown-card.active").forEach(e => e.classList.remove("active"))
      dropdownCard.classList.add("active")
    }
  }

  sumFormulari2(){
    const fases = document.querySelectorAll("#fases .dopdrown-card");

    fases.forEach(fase => {
      let select = fase.querySelector('select')?.value;
      let inici = (fase.querySelector(".dates .inputBox:nth-child(1) input") as HTMLInputElement)?.value;
      let fi = (fase.querySelector(".dates .inputBox:nth-child(2) input") as HTMLInputElement)?.value;
      let equipos = (fase.querySelector("input[type='number']") as HTMLInputElement)?.value;

      if(select && inici && fi && equipos) this.tournament.newFase(new Tournament_fase(inici, fi, parseInt(equipos), select))
    });
    console.log(this.tournament.checkFases());
    console.log(this.tournament)
  }

  /*****************************
   * ADD REMOVE FASES "FORM 2"
   ******************************/

  eliminarFase(){
    document.querySelector("#fases .dopdrown-card:last-child")?.remove();
    this.fase--;
  }

  agregarElementoHijo() {
    const parent = document.getElementById("fases");

    if (parent) {
      const newCard = document.createElement('div');
      newCard.className = 'dopdrown-card';
      const visiblePart = document.createElement('div');
      visiblePart.className = 'visible-part';
      visiblePart.addEventListener('click', () => this.dropdownAction(newCard));
      const heading = document.createElement('h1');
      heading.textContent = `Fase ${this.fase}`;
      const select = document.createElement('select');
      select.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      const option1 = document.createElement('option');
      option1.textContent = 'Liga';
      const option2 = document.createElement('option');
      option2.textContent = 'Eliminatoria';
      select.appendChild(option1);
      select.appendChild(option2);
      visiblePart.appendChild(heading);
      visiblePart.appendChild(select);
      newCard.appendChild(visiblePart);
  
      const dates = document.createElement('div');
      dates.className = 'dates';
      const inputBox1 = document.createElement('div');
      inputBox1.className = 'inputBox focus';
      const p1 = document.createElement('p');
      p1.textContent = 'Inicio';
      const input1 = document.createElement('input');
      input1.type = 'date';
      inputBox1.appendChild(p1);
      inputBox1.appendChild(input1);
      const inputBox2 = document.createElement('div');
      inputBox2.className = 'inputBox focus';
      const p2 = document.createElement('p');
      p2.textContent = 'Fin';
      const input2 = document.createElement('input');
      input2.type = 'date';
      inputBox2.appendChild(p2);
      inputBox2.appendChild(input2);
      dates.appendChild(inputBox1);
      dates.appendChild(inputBox2);
      newCard.appendChild(dates);
  
      const row = document.createElement('div');
      row.className = 'row';
      const p3 = document.createElement('p');
      p3.textContent = 'Nº Equipos';
      const input3 = document.createElement('input');
      input3.type = 'number';
      row.appendChild(p3);
      row.appendChild(input3);
      newCard.appendChild(row);
  
      parent.appendChild(newCard);
      this.fase++;
    }  
  }
  
  createPlayoff(){
    const teams = 8;
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
