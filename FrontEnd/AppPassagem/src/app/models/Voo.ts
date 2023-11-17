import { Aeroporto } from "./Aeroporto";
import { Aviao } from "./Aviao";

export class Voo {
  id: number = 0;
  numero: string = '';
  aviao: Aviao;
  aviaoId: number = 0;
  aeroportoOrigem: Aeroporto;
  aeroportoOrigemId: number = 0;
  aeroportoDestino: Aeroporto;
  aeroportoDestinoId: number = 0;

  constructor(aviao: Aviao, aeroportoOrigem: Aeroporto, aeroportoDestino: Aeroporto) {
    this.aviao = aviao;
    this.aeroportoOrigem = aeroportoOrigem;
    this.aeroportoDestino = aeroportoDestino;   
  }
}