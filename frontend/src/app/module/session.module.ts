import { Usuario } from "./usuario.module";

export class Session{
    user: Usuario;
    token: string;
    constructor( object: any ){
        this.user = (object.user) ? object.user : null;       
        this.token = (object.token) ? object.token : null;
    }
}