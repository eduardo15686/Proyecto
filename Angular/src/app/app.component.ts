import { Component, OnInit, ElementRef, Renderer2, ViewChild, SimpleChanges} from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { appRouting } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private _renderer: Renderer2, private router: Router) {
    
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login') {
          this.hideElement = true;
        } else if (event.url == '/register') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });

    if (localStorage.getItem('logged') != null) {
      if (localStorage.getItem('logged') === 'true') {
        AppComponent.logged = true;
      } else {
        AppComponent.logged = false;
      }
    }

    if (localStorage.getItem('username') != null) {
        AppComponent.user = localStorage.getItem('username');
    }

  }
  
  static get logged(): boolean {
    return AppComponent._logged;
  }
  static set logged(value: boolean) {
    AppComponent._logged = value;
  }
  private static _logged: boolean = false;

  static get user(): string {
    return AppComponent._user;
  }
  static set user(value: string) {
    AppComponent._user = value;
  }
  private static _user: string = '';
  
  public hideElement = false;

  sabor: string = '';
  descripcion: string = '';
  iq: number = null;
  imagen: string = '';
  logged: boolean = AppComponent.logged;
  ngOnInit(): void 
  {
  }

  

  

}
