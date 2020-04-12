import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartado',
  templateUrl: './apartado.component.html',
  styles: []
})
export class ApartadoComponent implements OnInit {


  cerebros: any;
  selectedBrain: string;

  id: string;
  sabor: string;
  cantidad: number;
  trigger: boolean;
  username: string;
  selectedCategory: string;
  categoria: string;
  llegada: Date;
  apartados: any;
  fecha: Date;
  semanaEnMilisegundos: number;
  suma: number;
  fechaDentroDeUnaSemana: Date;
  fixedTimezone: Date;

  constructor(private _dataService: DataService, private router: Router) { }

  flavors = [];
  prueba = ["Vainilla", "Fresa", "Chocolate"];
  

  
  redirect() {
    this.router.navigate(['login']);
}


  ngOnInit(): void {
    this.flavors = this.prueba;
    console.log("Actualizar tabla...");
    if (AppComponent.logged === false) {
      this.redirect();
    }
 
    this.actualizarTabla();
    this.ActualizarSelect();
  }
  actualizarTabla() {
    this._dataService.apartadosObservable
    .subscribe((resultados) => {
      this.apartados = resultados;
    });
    this._dataService.obtenerApartados();
  }

  ActualizarSelect() {
    this._dataService.cerebrosObservable.subscribe((resultados) => {
      this.cerebros = resultados;
    });
    this._dataService.obtenerCerebros();
  }



  guardarApartado() {
    let element = document.getElementById('mensajeAlertaGuardar');
    element.innerHTML = '';
    this.username = localStorage.getItem('username');
    
    if (this.categoria === 'Bronze') {
      this.fecha = new Date();
      this.semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 15;
      this.suma = this.fecha.getTime() + this.semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
      this.fechaDentroDeUnaSemana = new Date(this.suma);
      this.fixedTimezone = this.fecha;
    }
    if (this.categoria === 'Silver') {
      this.fecha = new Date();
      this.semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 7;
      this.suma = this.fecha.getTime() + this.semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
      this.fechaDentroDeUnaSemana = new Date(this.suma);
      this.fixedTimezone = this.fecha;
    }
    if (this.categoria === 'Gold') {
      this.fecha = new Date();
      this.semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 3;
      this.suma = this.fecha.getTime() + this.semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
      this.fechaDentroDeUnaSemana = new Date(this.suma);
      this.fixedTimezone = this.fecha;
    }
    console.log(this.sabor, this.cantidad, this.categoria, this.fecha, this.fechaDentroDeUnaSemana, this.username);
    this._dataService.agregarApartado(this.sabor[0], this.cantidad, this.categoria, this.fecha, this.fechaDentroDeUnaSemana, this.username)
      .subscribe((resultado) => {
      console.log(resultado);
      localStorage.removeItem('_id');
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError !== 0) {
        (error.error.mensajeError).forEach(function(mensajeError) {
          element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
          '<strong>' + mensajeError.mensaje + '</strong>' +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span>" +
          '</button>' +
        '</div>';
        });
      }
    });
  }

}
