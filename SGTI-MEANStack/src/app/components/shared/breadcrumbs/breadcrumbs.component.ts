import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  seccion: string;
  titulo: string;

  constructor(
    private router: Router,
    private title: Title)
  {
    this.getDataRoute()
      .subscribe( data => {
        this.seccion = data.seccion;
        this.titulo = data.titulo;
         //Titulo de la Pagina
        this.title.setTitle(this.titulo);
      })
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    )
  }

}
