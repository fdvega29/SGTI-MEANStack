export class TipoTramite {
    public _id: string;
    public formulario: string;
    public descripcion: string;
    public costo: number;

    constructor(_id = '', formulario = '', descripcion = '', costo = 0){
        this._id = _id;
        this.formulario = formulario;
        this.descripcion = descripcion;
        this.costo = costo;
    }
};