export class UsersModule { 

  constructor(_id = '', apellido = '', nombre = '', telefono = '', email = '', password = ''){
    this._id = _id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.password = password; 
  }
  _id: String;
  apellido: String;
  nombre: String;
  telefono: String;
  email: String;
  password: String;
}
