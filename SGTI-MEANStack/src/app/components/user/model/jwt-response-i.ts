export interface JwtResponseI {
    dataUser: {
        id: number,
        apellido: string,
        nombre: string,
        email: string,
        token: string,
        expiresIn: string
    }
}
