export class comprobantePago{
    public _id: String;
    public fecha: String;
    public usuario: String;
    public tramite: String;
    public importe: Number;
    public idOperacion: String;
    public estado: String;

    constructor(_id = '', fecha = '', usuario = '', tramite = '', importe = 0, idOperacion = '', estado = ''){
        this._id = _id;
        this.fecha = fecha;
        this.usuario = usuario;
        this.tramite = tramite;
        this.importe = importe;
        this.idOperacion = idOperacion;
        this.estado = estado;
    }
};