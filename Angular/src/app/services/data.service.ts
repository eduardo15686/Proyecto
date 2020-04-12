import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

let apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  editarCerebros(flavor: string, description: string, iq: string, picture: string, id: string) {
    throw new Error("Method not implemented.");
  }
  private updateZombies$ = new Subject<any>();
  zombiesObservable = this.updateZombies$.asObservable();


  private updateCerebros$ = new Subject<any>();
  cerebrosObservable = this.updateCerebros$.asObservable();


  private updateApartados$ = new Subject<any>();
  apartadosObservable = this.updateApartados$.asObservable();
  constructor(private _client: HttpClient) { }

async obtenerZombies() {
    let nombreP = localStorage.getItem('username');
    let zombies = await this._client.get(apiUrl + 'zombies/' + nombreP );
    return this.updateZombies$.next(zombies);
}

async obtenerCerebros() {
  let nombreP = localStorage.getItem('username');
  let cerebros = await this._client.get<any>(apiUrl + 'cerebros/' + nombreP);
  return this.updateCerebros$.next(cerebros);
}

async obtenerUsuario() {
  let usuarios = await this._client.get<any>(apiUrl + 'users');
  return usuarios;
}

async obtenerApartados(){
  let nombreP = localStorage.getItem('username');
  let apartados = await this._client.get<any>(apiUrl + 'apartados/' + nombreP);
  console.log(apartados);
  return this.updateApartados$.next(apartados);
}

async obtenerRol(username: string ) {
  let rol = await this._client.get<any>(apiUrl + 'users' + username);
  
  return rol;
}

async contarCh(url: string) {
  return this._client.get(url);
}
async contarV(url: string) {
  return this._client.get(url);
}
async contarF(url: string) {
  return this._client.get(url);
}
async contarCU(url: string, username:string) {
  return this._client.get(url + username);
}
async contarCRes(url: string) {
  return this._client.get(url);
}

agregarZombie(nombre: string, correo: string, tipo: string, usern: string) {
  let nuevoZombie = {
    name: nombre,
    email: correo,
    type: tipo,
    user: usern
  };
  return this._client.post(apiUrl + 'zombies/new', nuevoZombie);
}

agregarApartado(sabor: string, cantidad: number, categoria: string, fecha: Date, llegada: Date, usuario: string) {
  let nuevoApartado = {
    flavor: sabor,
    quantity: cantidad,
    date: fecha,
    arrive: llegada,
    category: categoria,
    user: usuario
  }
  return this._client.post(apiUrl + 'apartado/new', nuevoApartado);
}

eliminarZombie(id: string) {
  let _id = id;
  return this._client.delete(apiUrl + 'zombies/delete/' + _id);
}

actualizarZombie(id: string, nombre: string, correo: string, tipo: string) {
  let _id = id;
  let zombieModificado = {
    name: nombre,
    email: correo,
    type: tipo
  };
  return this._client.put(apiUrl + 'zombies/edit/' + _id, zombieModificado);
}

agregarCerebro(sabor: string, descripcion: string, Iq: number, foto: string, usern: string) {
  let nuevoCerebro = {
    flavor: sabor,
    description: descripcion,
    iq: Iq,
    picture: foto,
    user: usern
  };
  return this._client.post(apiUrl + 'cerebros/new', nuevoCerebro);
}

eliminarCerebro(id: string) {
  let _id = id;
  return this._client.delete(apiUrl + 'cerebros/delete/' + _id);
}

actualizarCerebro(id: string, sabor: string, descripcion: string, Iq: number, foto: string) {
  let _id = id;
  let cerebroModificado = {
    flavor: sabor,
    description: descripcion,
    iq: Iq,
    picture: foto
  };
  return this._client.put(apiUrl + 'cerebros/edit/' + _id, cerebroModificado);
}

agregarUsuario(_username: string, _email: string, _password: string, _type: string) {
  let nuevoUsuario = {
      username: _username,
      password: _password,
      email: _email,
      type: _type
  };
  return this._client.post(apiUrl + 'users/new', nuevoUsuario);
}

iniciarSesion(_username: string, _password: string) {
  let usuario = {
    username: _username,
    password: _password
  };
  return this._client.post(apiUrl + 'users/login', usuario);
}


}
