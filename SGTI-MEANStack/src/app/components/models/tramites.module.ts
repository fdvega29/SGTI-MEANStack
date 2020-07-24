export class dataTramites {
    public _id: string;
    public apellido: string;
    public nombre: string;
    public estadoCivil: string;
    public tipoDoc: string;
    public numDoc: string;
    public nacionalidad: string;
    public fechNac: string;
    public apeConyu: string;
    public nomConyu: string;
    public domicilio: string;
    public objetoPedido: string;
    public ubicacionInmueble: string;
    public estadoTram: string;
    public area: string;
    public producto: string;
    public tipoTram: string;
    public usuario: string;

    constructor(_id = '', apellido = '', nombre = '', estadoCivil = '', tipoDoc = '', numDoc = '', nacionalidad = '', fechNac = '',
                apeConyu = '', nombConyu = '', domicilio = '', objetoPedido = '', ubicacionInmueble = '', estadoTram = '', area = '', producto = '', tipoTram = '', usuario = ''){
        this._id = _id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.tipoDoc = tipoDoc;
        this.numDoc = numDoc;
        this.estadoCivil = estadoCivil;
        this.nacionalidad = nacionalidad;
        this.fechNac = fechNac;
        this.apeConyu = apeConyu;
        this.nomConyu = nombConyu;
        this.domicilio = domicilio;
        this.objetoPedido = objetoPedido;
        this.ubicacionInmueble = ubicacionInmueble;
        this.estadoTram = estadoTram;
        this.area = area;
        this.tipoTram = tipoTram;
        this.producto = producto;
        this.usuario = usuario;
    }
};
