import { Passageiro } from "./Passageiro";

export class Bagagem {
    id: number = 0;
    peso: number = 0;
    passageiro: Passageiro | undefined;
    passageiroId: number = 0;
}