import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ALogin } from 'src/app/project/services/API/kupu/login/ALogin';
import { AUsers } from 'src/app/project/services/API/kupu/users/AUsers';

import jwt_decode from 'jwt-decode';
import { ATournaments } from 'src/app/project/services/API/kupu/tournaments/ATournaments';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  lang_ES:any;
  lang_EN:any;
  lang:any;

  constructor(private Alogin:ALogin, private route:Router, private Ausers:AUsers, private ATournaments:ATournaments, private http:HttpClient) { 
    this.http.get<Array<any>>('/assets/languages/en.json').subscribe(data => {
      const loginObject = data.find(obj => obj.page === 'login');
      this.lang_EN = loginObject;
    });
    this.http.get<Array<any>>('/assets/languages/es.json').subscribe(data => {
      const loginObject = data.find(obj => obj.page === 'login');
      this.lang_ES = loginObject;
      this.lang = loginObject;
    });
  }


  translate(){
    const language = document.querySelector('.language:has(input:checked) p')?.textContent;
    switch (language){
      case 'EN':
        this.lang = this.lang_EN
        break;
      default:
        this.lang = this.lang_ES
        break;
    }
  }

  /**
   * DOM CHANGES + ACTIONS
   * if login form is active, tries to login. If it is not, it will make it visible
   */
  loginForm(advantatges: HTMLElement, loginBox:HTMLElement, name:string, password:string){
    if(advantatges.classList.contains('hide')) this.login(name, password);
    else {
      if(localStorage.getItem('KupuToken')) this.route.navigate(['home'])
      else this.showLoginForm(advantatges, loginBox);
    }
  }

  /**
   * USER LOGIN
   * @param name 
   * @param password 
   */
  login(name:string, password:string){
    this.Alogin.login(name, password).subscribe( data => {
        localStorage.setItem('KupuToken', data.token);
        const token:any = jwt_decode(data.token);
        this.getUserStatistics(token.id)
        this.getTournaments()
        // this.getUserTournaments(token.id);
        this.route.navigate(['home'])
      },
      error => {
        if (error.status === 422 || error.status === 404) {
          this.showError(error.error.data);
          console.log(error.error.data);
        } else if(error.status === 404) {
          console.log(error.error.data);
        } else {
          console.error(error);
        }
      }
    );
  }

  showError(error:string) {
    const errorElement:HTMLElement|null = document.querySelector('.error')
    if(errorElement) errorElement.textContent = error;
  }


  /**
   * DOM CHANGES
   * show login form hide div#avantatges
   */
  showLoginForm(advantatges: HTMLElement, loginBox:HTMLElement){
    advantatges.classList.add('hide');
    loginBox.classList.remove('hide');

    document.querySelectorAll('.floating-icon').forEach(icon => {
      icon.classList.add('hide');
    })

    // Delete bug with .floating-icon and input password [rezises the page]
    setTimeout(() => advantatges.parentElement?.classList.add('overflowHidden'), 1000)

  }

  /**
   * DOM CHANGES
   * show div#avantatges text hide login form
   */
  quitLogin(advantatges: HTMLElement, loginBox:HTMLElement){
    advantatges.classList.remove('hide');
    loginBox.classList.add('hide');

    document.querySelectorAll('.floating-icon').forEach(icon => {
      icon.classList.remove('hide');
    })

    advantatges.parentElement?.classList.remove('overflowHidden')
  }



  /**
   * API, get user data and save in local storage
   */
  getUserStatistics(id:string){
    this.Ausers.statistics(id).subscribe( data => {
      localStorage.setItem('KupuUser', JSON.stringify(data));
    },
    error => {
      if (error.status === 422) {
        console.log(error.error.data);
      } else if(error.status === 404) {
        console.log(error.error.data);
      } else {
        console.error(error);
      }
    }
  );
  }

  getUserTournaments(id:string){
    this.Ausers.tournaments(id).subscribe( data => {
      localStorage.setItem('KupuUserTournaments', JSON.stringify(data));
    },
    error => {
      if (error.status === 422) {
        console.log(error.error.data);
      } else if(error.status === 404) {
        console.log(error.error.data);
      } else {
        console.error(error);
      }
    }
  );
  }
  getTournaments(){
    this.ATournaments.getTournaments().subscribe( data => {
      localStorage.setItem('KupuTournaments', JSON.stringify(data));
    },
    error => {
      if (error.status === 422) {
        console.log(error.error.data);
      } else if(error.status === 404) {
        console.log(error.error.data);
      } else {
        console.error(error);
      }
    });
  }
}
