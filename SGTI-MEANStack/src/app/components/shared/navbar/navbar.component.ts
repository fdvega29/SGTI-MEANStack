import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../user/service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'SGTI';

  constructor( public userService : UserServiceService) { }

  ngOnInit() {
    
  }

}
