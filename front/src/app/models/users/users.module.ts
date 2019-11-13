export class UsersModule {

  constructor(_id ='', apellido = '', nombre = '', telefono = '', email = '', password = ''){
    this._id = _id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
  }

  _id: string;
  apellido: string;
  nombre: string;
  telefono: string;
  email: string;
  password: string;
}
