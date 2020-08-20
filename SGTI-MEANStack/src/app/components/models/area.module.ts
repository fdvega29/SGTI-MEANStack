export class Area {
    public _id: string;
    public nombre: string;
    public encargado: string;

    constructor(_id = '', nombre = '', encargado = ''){
        this._id = _id;
        this.nombre = nombre;
        this.encargado = encargado;
    }
};