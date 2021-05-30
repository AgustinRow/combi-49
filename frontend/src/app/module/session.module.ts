import { Usuario } from "./usuario.module";

export class Session{
    user: Usuario;
    token: string;
    constructor( object: any ){
        this.user = (object.data) ? object.data : null;
        this.token = (object.token) ? object.token : null;
    }
}