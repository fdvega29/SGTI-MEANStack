export interface JwtResponseI {
    dataUser: {
        id: string,
        apellido: string,
        nombre: string,
        email: string,
        token: string,
        expiresIn: string
    }
}
