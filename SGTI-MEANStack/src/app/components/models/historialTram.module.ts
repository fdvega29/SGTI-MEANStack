export class Historial {
    public _id: string;
    public estTramite: string;
    public area: string;
    public usuario: string;
    public tramite: string;

    constructor(_id = '', estTramite = '', area = '', usuario = '', tramite = ''){
        this._id = _id;
        this.estTramite = estTramite;
        this.area = area;
        this.usuario = usuario;
        this.tramite = tramite;
    }
};