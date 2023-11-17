import { Aeroporto } from "./Aeroporto";

export class Funcionario {
    id : number = 0;
    nome : string = "";
    cargo : string = "";
    aeroporto : Aeroporto | undefined;
    aeroportoId: number = 0;
}