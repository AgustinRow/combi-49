import { Usuario } from "./usuario.module";

export class Session{
    user: Usuario;
    constructor( object: Usuario ){
        this.user = object;
    }
}