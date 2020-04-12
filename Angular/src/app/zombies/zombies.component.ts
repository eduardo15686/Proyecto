import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ZombiesModalsComponent } from 'src/app/modals/zombies/zombiesmodals.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-zombies',
  templateUrl: './zombies.component.html',
  styleUrls: ['./zombies.component.css']
})
export class ZombiesComponent implements OnInit {
  // tslint:disable: no-inferrable-types
  private static _nombre: string = '';
  static get nombre(): string {
    return ZombiesComponent._nombre;
  }
  static set nombre(value: string) {
    ZombiesComponent._nombre = value;
  }
  private static _correo: string = '';
  static get correo(): string {
    return ZombiesComponent._correo;
  }
  static set correo(value: string) {
    ZombiesComponent._correo = value;
  }
  private static _tipo: string = '';
  static get tipo(): string {
    return ZombiesComponent._tipo;
  }
  static set tipo(value: string) {
    ZombiesComponent._tipo = value;
  }
  private static _id: string = '';
  static get id(): string {
    return ZombiesComponent._id;
  }
  static set id(value: string) {
    ZombiesComponent._id = value;
  }

  private static _trigger: boolean = false;
  static get trigger(): boolean {
    return ZombiesComponent._trigger;
  }
  static set trigger(value: boolean) {
    ZombiesComponent._trigger = value;
  }


  Agregar() {
    let zombie = {
      nombre: ZombiesComponent.nombre,
      correo: ZombiesComponent.correo,
      tipo: ZombiesComponent.tipo
    };
    this.zombies.push(zombie);
  }

  Borrar(nombre: string) {
    this.zombies = this.zombies.filter(item => item.nombre !== nombre);
    this.actualizarTabla();
  }


  guardarId( _id: string) {
    ZombiesComponent.id = _id;
    console.log(ZombiesComponent.id);
  }
  guardarDatos(id: string, name: string, email: string, type: string) {
    console.log(id, name, email, type);
    ZombiesComponent.id =  id;
    ZombiesComponent.nombre = name;
    ZombiesComponent.correo = email;
    ZombiesComponent.tipo = type;
    ZombiesComponent.trigger = true;
  }

  zombies: any;
  constructor(private _dataService: DataService, private router: Router) { }

  actualizarTabla() {
    let usern = localStorage.getItem('username');
    this._dataService.zombiesObservable
    .subscribe((resultados) => {
      this.zombies = resultados;
    });

    this._dataService.obtenerZombies();
  }

  redirect() {
    this.router.navigate(['login']);
}

  ngOnInit(): void {
    console.log('Actualizar tabla...');
    this.actualizarTabla();
    if (AppComponent.logged === false) {
      this.redirect();
    }
  }

}
