import { Usuario } from "./usuario.module";

export class Session{
    user: Usuario;
    token: string;
    constructor( object: Usuario ){
        this.user = object;       
        this.token = null;
    }
}