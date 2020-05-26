export class usersModule {
    public _id: string;
    public nombre: string;
    public telefono: string;
    public email: string;
    public password: string;
    public img?: string;
    public roles?: string;
    public google?: string;

    constructor(_id = '', nombre = '', telefono = '', email = '', password = '', img = '', roles = '', google = ''){
        this._id = _id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.img = img;
        this.roles = roles;
        this.google = google;
    }

}