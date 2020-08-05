import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public enviarFormulario(nombre) {
    localStorage.setItem('FormularioPedido', nombre);
    this.router.navigate(['dashboard/nuevo-tramite']);
  }
}
