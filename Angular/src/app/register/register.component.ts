import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  type: string;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  guardarUsuario() {
    var element = document.getElementById("mensajeAlertaGuardarUsuarios");
    element.innerHTML = "";
    console.log(this.username, this.password, this.email,this.type);
    this.dataService.agregarUsuario(this.username, this.email, this.password, this.type)
      .subscribe((resultado) => {
      console.log(resultado);
      this.username = "";
      this.password = "";
      this.email = "";
      this.type="";
      this.redirect();
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError != 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
          "<strong>" + mensajeError.mensaje +"</strong>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            "<span aria-hidden='true'>&times;</span>"+
          "</button>"+
        "</div>";
        });
      }
    });
  }
  redirect() {
    this.router.navigate(['login']);
}
}
