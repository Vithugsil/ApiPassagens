import { Passageiro } from "./Passageiro";

export class Bagagem {
    id: number = 0;
    peso: number = 0;
    passageiro: Passageiro;
    passageiroId: number = 0;

    constructor(peso: number, passageiro: Passageiro)
    {
        this.peso = peso
        this.passageiro = passageiro
    }
}