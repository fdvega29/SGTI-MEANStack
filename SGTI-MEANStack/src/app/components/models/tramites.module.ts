export class dataTramites {
    public id: string;
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
    public producto: string;
    public tipoTram: string;
    public usuario: string;

    constructor(id = '', apellido = '', nombre = '', estadoCivil = '', tipoDoc = '', numDoc = '', nacionalidad = '', fechNac = '',
                apeConyu = '', nombConyu = '', domicilio = '', objetoPedido = '', ubicacionInmueble = '', estadoTram = '', producto = '', tipoTram = '', usuario = ''){
        this.id = id;
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
        this.tipoTram = tipoTram;
        this.producto = producto;
        this.usuario = usuario;
    }
};
