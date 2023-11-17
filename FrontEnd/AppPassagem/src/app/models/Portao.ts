import { Aeroporto } from "./Aeroporto";

export class Portao {
    id: number = 0;
    codigo : string = "";
    aeroporto : Aeroporto;
    aeroportoId : number = 0;

    constructor(aeroporto: Aeroporto){
        this.aeroporto = aeroporto;
    }
}