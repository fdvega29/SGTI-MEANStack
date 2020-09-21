export class SincronizacionPagos{
    public _id: string;
    public usuario: string;
    public totProcesados: string;
    public totActualizados: string;

    constructor(_id = '', usuario = '', totProcesados = '', totActualizados = ''){
        this._id = _id;
        this.usuario = usuario;
        this.totProcesados = totProcesados;
        this.totActualizados = totActualizados;
    }
};