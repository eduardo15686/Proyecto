import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ZombiesComponent } from 'src/app/zombies/zombies.component';

@Component({
  selector: 'modal-zombies',
  templateUrl: './zombies.component.html',
})
export class ZombiesModalsComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('modalEliminar') public modalEliminar: ElementRef;
  @ViewChild('modalActualizar') public modalActualizar: ElementRef;
  id: string;
  nombre: string;
  correo: string;
  tipo: string;
  trigger: boolean;
  username: string;
  constructor(private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.trigger = ZombiesComponent.trigger;
    if (this.trigger === true) {
      this.id = ZombiesComponent.id;
      this.nombre = ZombiesComponent.nombre;
      this.correo = ZombiesComponent.correo;
      this.tipo = ZombiesComponent.tipo;
      ZombiesComponent.trigger = false;
    }
  }

  guardarZombie() {
    let element = document.getElementById('mensajeAlertaGuardar');
    element.innerHTML = '';
    this.username = localStorage.getItem('username');
    console.log(this.nombre, this.correo, this.tipo, this.username);
    this.dataService.agregarZombie(this.nombre, this.correo, this.tipo, this.username)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this.dataService.obtenerZombies();
      this.nombre = '';
      this.correo = '';
      this.tipo = '';
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

  borrarZombie() {
    let element = document.getElementById('mensajeAlertaBorrar');
    this.username = localStorage.getItem('username');
    element.innerHTML = '';
    this.id = ZombiesComponent.id;
    console.log(this.id);
    this.dataService.eliminarZombie(this.id)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modalEliminar.nativeElement, true).click();
      this.dataService.obtenerZombies();
      localStorage.removeItem('_id');
    }, (error) => {
      console.log( error );
      if (error.error.mensajeError !== 0) {
        (error.error.mensajeError).forEach( function (mensajeError) {
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

  actualizarZombie() {
    console.log(this.id, this.nombre, this.correo, this.tipo);
    this.username = localStorage.getItem('username');
    let element = document.getElementById('mensajeAlertaActualizar');
    element.innerHTML = '';
    this.dataService.actualizarZombie(this.id, this.nombre, this.correo, this.tipo)
      .subscribe((resultado) => {
      console.log(resultado);
      this._renderer.selectRootElement(this.modalActualizar.nativeElement, true).click();
      this.dataService.obtenerZombies();
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
