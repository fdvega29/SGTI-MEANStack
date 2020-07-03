export class minutaG {
  public id: string;
  public apellido: string;
  public nombre: string;
  public estCivil: string;
  public numDoc: string;
  public domicilio: string;
  public objetoPedido: string;
  public ubicacionInmueble: string;
  public tipoTram: string;
  public producto: string;
  public estadoTram: string;
  public usuario: string;

  constructor(id = '',
              apellido = '',
              nombre = '',
              estCivil = '',
              numDoc = '',
              domicilio = '',
              objetoPedido = '',
              ubicacionInmueble = '',
              tipoTram = '',
              producto = '',
              estadoTram = '',
              usuario = '')
  {
      this.id = id;
      this.apellido = apellido;
      this.nombre = nombre;
      this.estCivil = estCivil;
      this.numDoc = numDoc;
      this.domicilio = domicilio;
      this.objetoPedido = objetoPedido;
      this.ubicacionInmueble = ubicacionInmueble;
      this.tipoTram = tipoTram;
      this.producto = producto;
      this.estadoTram = estadoTram;
      this.usuario = usuario;
  }

}
