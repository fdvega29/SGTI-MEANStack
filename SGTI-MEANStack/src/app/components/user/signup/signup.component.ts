import { Component, OnInit } from '@angular/core';
import { UsersModule } from 'src/app/components/user/usersModel/users/users.module';
import { UserServiceService } from 'src/app/components/user/userService/users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersModule]
})
export class SignupComponent implements OnInit {

  createFormGroup(){
    return new FormGroup({
      apellido: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signupForm: FormGroup;

  constructor(private usersService: UserServiceService) {
      this.signupForm = this.createFormGroup();
   }

  ngOnInit() {}

  onSaveForm(form): void{
    console.log(this.signupForm.value);
  }

}
