import { Component, OnInit} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sabor',
  templateUrl: './sabor.component.html',
  styleUrls: ['./sabor.component.css']
})
export class SaborComponent implements OnInit{
  sabor: string;
  Chocolate: string;
  Vainilla: string;
  Fresa: string;
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Chocolate'], ['Vainilla'], 'Fresa'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#CA7E0B', '#F4EE47', '#F447A0'],
    },
  ];

  constructor(private dataService: DataService) {
   }

  ngOnInit() {
    this.actualizarSabores();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  async actualizarSabores() {
    (await this.dataService.contarCh('http://localhost:3000/api/Chocolate')).subscribe((resultado) => {
      localStorage.setItem('Chocolate', resultado.toString());
    });
    (await this.dataService.contarCh('http://localhost:3000/api/Vainilla')).subscribe((resultado) => {
      localStorage.setItem('Vainilla', resultado.toString());
    });
    (await this.dataService.contarCh('http://localhost:3000/api/Fresa')).subscribe((resultado) => {
      localStorage.setItem('Fresa', resultado.toString());
    });

    this.Chocolate = localStorage.getItem('Chocolate');
    this.Vainilla = localStorage.getItem('Vainilla');
    this.Fresa = localStorage.getItem('Fresa');

    await console.log(this.Chocolate,this.Vainilla,this.Fresa);
  }


  actualizarS() {
    this.actualizarSabores();
    this.pieChartData = [ parseInt(this.Chocolate), parseInt(this.Vainilla), parseInt(this.Fresa) ];
  }
}
