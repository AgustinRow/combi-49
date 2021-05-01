import { Usuario } from "./usuario.module";

export class Session{
    user: Usuario;
    constructor( object: any){
        this.user = (object.user) ? object.user : null;
    }
}