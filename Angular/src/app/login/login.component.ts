import { Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  //aD: string;
  constructor(private dataService: DataService, private _renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
  }

  
 

  login() {
    var element = document.getElementById("mensajeAlertaUsuarios");
    element.innerHTML = "";
    this.dataService.iniciarSesion(this.username, this.password)
      .subscribe((resultado) => {
      console.log(resultado);
      /*let usuario = this.dataService.obtenerUsuario();
      console.log(usuario);*/
      let admin = this.dataService.obtenerRol(this.username);
      console.log(admin);
      localStorage.setItem('username', this.username);
      AppComponent.user = this.username;
      this.username = "";
      this.password = ""; 
      localStorage.setItem('logged', 'true');
      //localStorage.setItem('admin', aD);
      AppComponent.logged = true;
      console.log(AppComponent.logged);
      this.redirect();

    }, (error) => {
      console.log( error );
      element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
          "<strong>" + error.error.mensajeError +"</strong>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            "<span aria-hidden='true'>&times;</span>"+
          "</button>"+
        "</div>";
    });
  }

    redirect() {
      this.router.navigate(['dashboard']);
  }

register() {
  this.router.navigate(['register']);
}

}
