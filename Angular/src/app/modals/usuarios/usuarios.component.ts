import { Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
    @ViewChild('modal') public modal: ElementRef;
    @ViewChild('modalEliminar') public modalEliminar: ElementRef;
    @ViewChild('modalActualizar') public modalActualizar: ElementRef;
    id: string;
    username: string;
    password: string;
    email: string;
    trigger: boolean;

  constructor(private dataService: DataService, private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

}
