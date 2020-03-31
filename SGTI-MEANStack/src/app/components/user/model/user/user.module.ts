export class UsersModule { 

  constructor(_id = '', apellido = '', nombre = '', telefono = '', email = '', password = '', role = '', google = ''){
    this._id = _id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
    this.role = role;
    this.google = google; 
  }
  _id: string;
  apellido: string;
  nombre: string;
  telefono: string;
  email: string;
  password: string;
  role?: string;
  google?: string
}

