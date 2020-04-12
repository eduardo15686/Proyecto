import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cerebros-usuario',
  templateUrl: './cerebros-usuario.component.html',
  styleUrls: ['./cerebros-usuario.component.css']
})
export class CerebrosUsuarioComponent implements OnInit {
  cerebrosU: string;
  cerebrosRes: string;
  username: string;
  public doughnutChartLabels: Label[] = ['Tus cerebros', 'Cerebros'];
  public doughnutChartData: number[] = [ 0, 0];
  public doughnutChartType: ChartType = 'doughnut';
  

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.actualizarCUsuarios();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  async actualizarCUsuarios() {
    this.username = localStorage.getItem('username');
    (await this.dataService.contarCU('http://localhost:3000/api/cerebrosU/', this.username)).subscribe((resultado) => {
      localStorage.setItem('CerebrosU', resultado.toString());
    });
    (await this.dataService.contarCRes('http://localhost:3000/api/cerebrosRes')).subscribe((resultado) => {
      localStorage.setItem('CerebrosRes', resultado.toString());
    });

    this.cerebrosU = localStorage.getItem('CerebrosU');
    this.cerebrosRes = localStorage.getItem('CerebrosRes');

    await console.log(this.cerebrosU, this.cerebrosRes);
  }


  actualizarDatos() {
    this.actualizarCUsuarios();
    this.doughnutChartData= [ parseInt(this.cerebrosU), (parseInt(this.cerebrosRes)-parseInt(this.cerebrosU))];
  }

}
