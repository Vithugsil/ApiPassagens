import { CompanhiaAerea } from "./CompanhiaAerea";

export class Aviao {
    id: number = 0;
    modelo: string = "";
    companhiaAerea : CompanhiaAerea | undefined;
    companhiaAereaId : number = 0;
}
