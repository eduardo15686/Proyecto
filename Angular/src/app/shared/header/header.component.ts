import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    
    // tslint:disable-next-line: no-unused-expression
    
  }
   private _username = "";
   private _type ="";
  public get username() {
    return this._username;
  }
  public set username(value) {
    this._username = value;
  }
  public get type() {
    return this._type;
  }
  public set type(value) {
    this._type = value;
  }

  private _foto = "";
  public get foto() {
    return this._foto;
  }
  public set foto(value) {
    this._foto = value;
  }

   

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if (AppComponent.logged === true) {
      this.username = AppComponent.user;
    }
  }

  cerrarSesion() {
    localStorage.setItem('logged', 'false');
      AppComponent.logged = false;
      console.log(AppComponent.logged);
      this.redirect();
  }

  redirect() {
    this.router.navigate(['login']);
  }
}
