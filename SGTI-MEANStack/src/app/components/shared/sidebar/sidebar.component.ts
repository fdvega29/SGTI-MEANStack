import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user/service/user.service';
import { UsersModule } from '../../user/model/user/user.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsersModule]
})
export class SidebarComponent implements OnInit {

  constructor(public userService: UserServiceService, public usuario: UsersModule) { }

  title = "SGTI";
  ngOnInit() {
  }

}
