import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Voo } from 'src/app/models/Voo';
import { VoosService } from 'src/app/services/voos.service';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Aviao } from 'src/app/models/Aviao';
import { AvioesService } from 'src/app/services/avioes.service';

@Component({
  selector: 'app-voos',
  templateUrl: './voos.component.html',
  styleUrls: ['./voos.component.css'],
})
export class VoosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  avioes: Array<Aviao> | undefined;
  aeroportosOrigem: Array<Aeroporto> | undefined;
  aeroportosDestino: Array<Aeroporto> | undefined;

  constructor(
    private voosService: VoosService,
    private avioesService: AvioesService,
    private aeroportosService: AeroportosService
  ) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Voo';

    this.avioesService.listar().subscribe((avioes) => {
      this.avioes = avioes;
      if (this.avioes && this.avioes.length > 0) {
        this.formulario.get('pagamentoId')?.setValue(this.avioes[0].id);
      }
    });

    this.aeroportosService.listar().subscribe((aeroportosOrigem) => {
      this.aeroportosOrigem = aeroportosOrigem;
      if (this.aeroportosOrigem && this.aeroportosOrigem.length > 0) {
        this.formulario
          .get('aeroportoOrigemId')
          ?.setValue(this.aeroportosOrigem[0].id);
      }
    });

    this.aeroportosService.listar().subscribe((aeroportosDestino) => {
      this.aeroportosDestino = aeroportosDestino;
      if (this.aeroportosDestino && this.aeroportosDestino.length > 0) {
        this.formulario
          .get('aeroportoDestinoId')
          ?.setValue(this.aeroportosDestino[0].id);
      }
    });

    this.formulario = new FormGroup({
      numero: new FormControl(null),
      aviaoId: new FormControl(null),
      aeroportoOrigemId: new FormControl(null),
      aeroportoDestinoId: new FormControl(null),
    });
  }

  enviarFormulario(): void {
    const voo: Voo = this.formulario.value;
    const observer: Observer<Voo> = {
      next(_result): void {
        alert('Voo salvo com sucesso.');
      },
      error(_error): void {
        alert('Erro ao salvar!');
      },
      complete(): void {},
    };
    /*
    if (????) {
      this.carrosService.alterar(carro).subscribe(observer);
    } else {
    */
    this.voosService.cadastrar(voo).subscribe(observer);
  }
}
