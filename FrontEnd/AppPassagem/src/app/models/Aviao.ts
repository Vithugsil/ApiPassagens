import { CompanhiaAerea } from "./CompanhiaAerea";

export class Aviao {
    id: number = 0;
    modelo: string = "";
    companhiaAerea : CompanhiaAerea;
    companhiaAereaId : number = 0;
    
    constructor(companhiaAerea : CompanhiaAerea){
        this.companhiaAerea = companhiaAerea;
    }
}
