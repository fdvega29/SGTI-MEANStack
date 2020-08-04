import { Component, OnInit } from '@angular/core';
import { TramitesService } from '../../services/tramites.service';
import { UsuarioService } from '../../services/usuario.service';
import { dataTramites } from '../../models/tramites.module';
import Chart from 'chart.js';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: []
})
export class PrincipalComponent implements OnInit {

  usuario: any = {};
  tramites: dataTramites[] = [];

  cInic: number = 0;
  cProc: number = 0;
  cFina: number = 0;

  constructor(private dataTramite: TramitesService, public userService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
    this.getDataTramiteById();
  }

  public getDataTramiteById(): void {
    this.dataTramite
      .getAllTramitesById(this.usuario._id)
      .subscribe((resp: any) => {
        this.tramites = resp.allDataMinH;
        this.cInic = resp.iniciados;
        this.cProc = resp.proceso;
        this.cFina = resp.finalizados;

        var ctx = document.getElementById('myChart')
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [this.cInic, this.cProc, this.cFina, this.tramites.length],
              backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(51, 204, 51, 1)',
                'rgba(255, 77, 77, 1)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(51, 204, 51, 1)',
                'rgba(255, 77, 77, 1)'
              ],
              borderWidth: 1
            }],
            labels: [
              'Iniciados',
              'En proceso',
              'Finalizados',
              'Total'
            ]
          }
        });
      })
  }
}
