import { Aeroporto } from "./Aeroporto";

export class Funcionario {
    id : number = 0;
    nome : string = "";
    cargo : string = "";
    aeroporto : Aeroporto;
    aeroportoId: number = 0;

    constructor(nome: string, cargo: string, aeroporto: Aeroporto){
        this.nome = nome
        this.cargo = cargo
        this.aeroporto = aeroporto
    }
}