import { Pagamento } from "./Pagamento";
import { Passageiro } from "./Passageiro";
import { Portao } from "./Portao";
import { Voo } from "./Voo";

export class Passagem {
    id: number = 0;
    classe: string = "";
    preco: number = 0;
    pagamento: Pagamento;
    pagamentoId: number = 0;
    portao: Portao;
    portaoId: number = 0;
    voo: Voo;
    vooId: number = 0;
    passageiro : Passageiro;
    passageiroId: number = 0;

    constructor(pagamento: Pagamento, portao : Portao, voo: Voo, passageiro : Passageiro){
        this.pagamento = pagamento;
        this.portao = portao;
        this.voo = voo;
        this.passageiro = passageiro;
    }
}