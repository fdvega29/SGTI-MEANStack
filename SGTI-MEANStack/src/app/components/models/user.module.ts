export class usersModule {
    public _id: string;
    public apellido: string;
    public nombre: string;
    public telefono: string;
    public email: string;
    public password: string;
    public img?: string;
    public roles?: string;
    public estado?: string;
    public google?: string;

    constructor(_id = '', apellido = '', nombre = '', telefono = '', email = '', password = '', img = '', roles = '', estado = '', google = ''){
        this._id = _id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.img = img;
        this.roles = roles;
        this.estado = estado;
        this.google = google;
    }

}