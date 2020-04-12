import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FormBuilder } from "@angular/forms";
import { observable } from 'rxjs';
@Component({
  selector: 'app-cerebros',
  templateUrl: './cerebros.component.html',
  styleUrls: ['./cerebros.component.css']
})
export class CerebrosComponent implements OnInit {

  private static _id: string = '';
  static get id(): string {
    return CerebrosComponent._id;
  }
  static set id(value: string) {
    CerebrosComponent._id = value;
  }

  private static _sabor: string = '';
  static get sabor(): string {
    return CerebrosComponent._sabor;
  }
  static set sabor(value: string) {
    CerebrosComponent._sabor = value;
  }

  private static _descripcion: string = '';
  static get descripcion(): string {
    return CerebrosComponent._descripcion;
  }
  static set descripcion(value: string) {
    CerebrosComponent._descripcion = value;
  }

  private static _iq: number = null;
  static get iq(): number {
    return CerebrosComponent._iq;
  }
  static set iq(value: number) {
    CerebrosComponent._iq = value;
  }

  private static _imagen: string = '';
  static get imagen(): string {
    return CerebrosComponent._imagen;
  }
  static set imagen(value: string) {
    CerebrosComponent._imagen = value;
  }

  private static _trigger: boolean = false;
  static get trigger(): boolean {
    return CerebrosComponent._trigger;
  }
  static set trigger(value: boolean) {
    CerebrosComponent._trigger = value;
  }
  
  username: string;

  Agregar() {
    // tslint:disable-next-line: prefer-const
    let cerebro = {
      sabor: CerebrosComponent.sabor,
      iq: CerebrosComponent.iq,
      descripcion: CerebrosComponent.descripcion,
      imagen: CerebrosComponent.imagen
    };
    this.cerebros.push(cerebro);
  }

  Borrar(sabor: string) {
    this.cerebros = this.cerebros.filter(item => item.sabor !== sabor);
  }

  Actualizar(sabor: string, iq: number, descripcion: string, imagen: string) {
    if (CerebrosComponent.iq !== null) {
      this.cerebros.find(item => item.sabor === sabor).iq = CerebrosComponent.iq;
    }
    if (CerebrosComponent.descripcion !== '') {
      this.cerebros.find(item => item.sabor === sabor).descripcion = CerebrosComponent.descripcion;
    }
    if (CerebrosComponent.imagen !== '') {
      this.cerebros.find(item => item.sabor === sabor).imagen = CerebrosComponent.imagen;
    }
    if (CerebrosComponent.sabor !== '') {
      this.cerebros.find(item => item.sabor === sabor).sabor = CerebrosComponent.sabor;
    }
  }

  guardarID(id: string) {
    CerebrosComponent.id = id;
  }
  
  guardarDatos(id: string, flavor: string, iq: number, description: string, picture: string) {
    console.log(id, flavor, iq, description, picture);
    CerebrosComponent.id = id;
    CerebrosComponent.sabor = flavor;
    CerebrosComponent.iq = iq;
    CerebrosComponent.descripcion = description;
    CerebrosComponent.imagen = picture;
    CerebrosComponent.trigger = true;
  }

  cerebros: any;
  
  constructor(private _dataService: DataService, private router: Router) {}

  redirect() {
    this.router.navigate(['login']);
}
  actualizarTabla() {
    this._dataService.cerebrosObservable
    .subscribe((resultados) => {
      this.cerebros = resultados;
    });
    this._dataService.obtenerCerebros();
  }
  
  ngOnInit(): void {
    console.log("Actualizar tabla...");
    this.actualizarTabla();
    if(AppComponent.logged === false){
      this.redirect();
    }
  }

}
