import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent implements OnInit {
  creationIndex: number = 1;
  statePriv:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  setState(select:any){
    if(select.value == 'Privado') this.statePriv = true;
    else this.statePriv = false;
  }


  check(){
    switch(this.creationIndex){
      case 1:
        this.checkFormulari1();
        this.sum();
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  }

  checkFormulari1() {
    const formElements: Array<{ name: string, HTMLelement: Element | null }> = [];
    const form = document.querySelector('.form.first');
  
    if (form) {
      formElements.push({ name: 'name', HTMLelement: form.querySelector("input[name='name']") });
      formElements.push({ name: 'description', HTMLelement: form.querySelector("textarea") });
      formElements.push({ name: 'date', HTMLelement: form.querySelector("input[type='date']") });
      formElements.push({ name: 'teams', HTMLelement: form.querySelector("input[name='teams']") });
      formElements.push({ name: 'num_players', HTMLelement: form.querySelector("input[name='num_players']") });
      formElements.push({ name: 'state', HTMLelement: form.querySelector("select") });

      if(form.querySelector('select')?.value === 'Privado') {
        formElements.push({ name: 'code', HTMLelement: form.querySelector("input[name='privCode'")})
        formElements.push({ name: 'password', HTMLelement: form.querySelector("input[name='privPassword'")})
      }
    }
  
    formElements.forEach(e => {
      if (e.HTMLelement && (e.HTMLelement as HTMLInputElement).value) {
        (e.HTMLelement.parentNode as HTMLElement).classList.remove('error');
      } else if (e.HTMLelement) {
        (e.HTMLelement.parentNode as HTMLElement).classList.add('error');
      }
    });
  }
  
  substract(){this.creationIndex=this.creationIndex-1;}
  sum(){
    if(document.querySelectorAll(".error").length < 1) this.creationIndex=this.creationIndex+1;
  }
}
