import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css']
})
export class NuevoTramiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Smart-Wizard
    $('#stepwizard').smartWizard({
      theme: 'dots',
      transitionEffect: 'slide',
      transitionSpeed: '400',
      selected: 0,
      lang: { next: 'Siguiente', previous: 'Anterior'}
    });
  }

}
