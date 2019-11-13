import { Component, OnInit } from '@angular/core';

import { UsersModule } from 'src/app/models/users/users.module';
/*import { NgForm } from '@angular/forms';*/
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UsersModule ]
})
export class RegisterComponent implements OnInit {

  createFormGroup(){
    return new FormGroup({
      apellido: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  registerForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.registerForm = this.createFormGroup(); //instancia del create
  }

  ngOnInit() {
  }

  onResetForm(){
    this.registerForm.reset();
  }

  onSaveForm(){
    console.log(this.registerForm.value);
  }

}
