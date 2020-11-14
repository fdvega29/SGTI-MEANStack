export class SincronizacionPagos{
    public _id: string;
    public usuario: string;
    public totProcesados: string;
    public totActualizados: string;
    public fecha: string;

    constructor(_id = '', usuario = '', totProcesados = '', totActualizados = '', fecha: ''){
        this._id = _id;
        this.usuario = usuario;
        this.totProcesados = totProcesados;
        this.totActualizados = totActualizados;
        this.fecha = fecha;
    }
};