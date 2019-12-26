import { Component, OnInit } from '@angular/core';
import { UsersModule } from 'src/app/components/user/usersModel/users/users.module';
import { UserServiceService } from 'src/app/components/user/userService/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminModule } from '../usersModel/adminModel/admin.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersModule, AdminModule]
})
export class SignupComponent implements OnInit {

  signupFormUser: FormGroup;
  signupFormAdmin: FormGroup;

  createFormGroupUser() {
    return new FormGroup({
      apellido: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  createFormGroupAdmin() {
    return new FormGroup({
      usuario: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }


  constructor(private usersService: UserServiceService) {
      this.signupFormUser = this.createFormGroupUser();
      this.signupFormAdmin = this.createFormGroupAdmin();
   }



  ngOnInit() {}

  onSaveFormUser(form): void{
    console.log(this.signupFormUser.value);
  }

  onSaveFormAdmin(form): void{
    console.log(this.signupFormAdmin.value);
  }

}
