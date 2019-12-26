export class AdminModule {

  constructor(_id = '', usuario = '', email = '', password = '') {
    this._id = _id;
    this.usuario = usuario;
    this.email = email;
    this.password = password;
  }
  _id: string;
  usuario: string;
  email: string;
  password: string;
}
