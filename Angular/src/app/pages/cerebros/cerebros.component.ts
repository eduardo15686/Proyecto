import { Component, OnInit , ElementRef, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cerebros',
  templateUrl: './cerebros.component.html',
  styleUrls: ['./cerebros.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CerebrosComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  @ViewChild('error') public error: ElementRef;
  cerebros: any;
  flavor: string;
  description: string;
  iq: string;
  picture: string;
  id: string;
  error0: string;
  error1: string;

  constructor(private _dataService: DataService, private _appComponent: AppComponent, private router: Router) { }

  ngOnInit(): void {
    if (!this._appComponent.loged){
      this.router.navigate(['login']);
    }
    this.refresh();
  }

  guardarCerebro() {
    console.log();
    this._dataService.agregarCerebros(this.flavor,
        this.description, this.iq, this.picture).subscribe((resultado) => { this.refresh(); },
        (error) => {
          this.error0 = error.error.errors;
          console.log(this.error0);
        });
  }

  eliminarCerebro(id: string) {
    console.log(id);
    this._dataService.eliminarCerebros(id).subscribe((resultado) => this.refresh());
  }

  editarCerebros(flavor: string, description: string, iq: string, picture: string, id: string) {
    this.flavor = flavor;
    this.description = description;
    this.iq = iq;
    this.picture = picture;
    this.id = id;
  }

  editarCerebro() {
    this._dataService.editarCerebros(this.flavor, this.description, this.iq, this.picture, this.id).subscribe((resultado) => {
      this.refresh();
    }, (error) => {
      this.error1 = error.error.errors;
      console.log(this.error1);
    });
  }

  refresh() {
    this._dataService.cerebrosObservable.subscribe((resultado) => {
      this.cerebros = resultado;
      console.log(this.cerebros);
    });

    this._dataService.obtenerCerebros();
  }
}
