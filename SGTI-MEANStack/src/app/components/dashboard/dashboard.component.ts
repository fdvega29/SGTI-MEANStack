import { Component, OnInit } from '@angular/core';
import { UserServiceService} from '../user/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private usersService: UserServiceService) { }

  ngOnInit() {
  }

}
