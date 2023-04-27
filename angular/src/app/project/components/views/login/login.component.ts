import { Component } from '@angular/core';
import { ALogin } from 'src/app/project/services/API/kupu/login/ALogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private Alogin:ALogin) { }

  loginForm(advantatges: HTMLElement, loginBox:HTMLElement, name:string, password:string){
    if(advantatges.classList.contains('hide')) this.login(name, password);
    else this.showLoginForm(advantatges, loginBox);
  }

  login(name:string, password:string){
    console.log(`name: ${name}`)
    console.log(`password: ${password}`)
    
    this.Alogin.login(name, password).subscribe( data => console.log(data));
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
}
