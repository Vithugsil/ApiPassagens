import { Aeroporto } from "./Aeroporto";
import { Aviao } from "./Aviao";

export class Voo {
  id: number = 0;
  numero: string = '';
  aviao: Aviao;
  aviaoId: number = 0;
  origemAeroporto: Aeroporto;
  origemAeroportoId: number = 0;
  destinoAeroporto: Aeroporto;
  destinoAeroportoId: number = 0;

  constructor(
    numero: string,
    aviao: Aviao,
    aviaoId: number,
    origemAeroportoId: number,
    origemAeroporto: Aeroporto,
    destinoAeroportoId: number,
    destinoAeroporto: Aeroporto
  ) {
    this.numero = numero;
    this.aviao = aviao;
    this.aviaoId = aviaoId;
    this.origemAeroporto = origemAeroporto;
    this.origemAeroportoId = origemAeroportoId;
    this.destinoAeroporto = destinoAeroporto;
    this.destinoAeroportoId = destinoAeroportoId;
  }
}