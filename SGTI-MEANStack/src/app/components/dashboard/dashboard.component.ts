import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AutenticacionService) { }

  ngOnInit() {
  }

}
