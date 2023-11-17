import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Pagamento } from 'src/app/models/Pagamento';
import { PagamentosService } from 'src/app/services/pagamentos.service';
import { Passageiro } from 'src/app/models/Passageiro';
import { PassageirosService } from 'src/app/services/passageiros.service';
import { Portao } from 'src/app/models/Portao';
import { PortoesService } from 'src/app/services/portoes.service';
import { Voo } from 'src/app/models/Voo';
import { VoosService } from 'src/app/services/voos.service';
import { Passagem } from 'src/app/models/Passagem';
import { PassagensService } from 'src/app/services/passagens.service';
import { Aeroporto } from 'src/app/models/Aeroporto';

@Component({
  selector: 'app-passagens',
  templateUrl: './passagens.component.html',
  styleUrls: ['./passagens.component.css'],
})
export class PassagensComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  pagamentos: Array<Pagamento> | undefined;
  portoes: Array<Portao> | undefined;
  voos: Array<Voo> | undefined;
  passageiros: Array<Passageiro> | undefined;

  constructor(
    private passagensService: PassagensService,
    private pagamentosService: PagamentosService,
    private passageirosService: PassageirosService,
    private portoesService: PortoesService,
    private voosService: VoosService,
  ) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Passagem';

    this.pagamentosService.listar().subscribe((pagamentos) => {
      this.pagamentos = pagamentos;
      if (this.pagamentos && this.pagamentos.length > 0) {
        this.formulario.get('pagamentoId')?.setValue(this.pagamentos[0].id);
      }
    });

    this.passageirosService.listar().subscribe((passageiros) => {
      this.passageiros = passageiros;
      if (this.passageiros && this.passageiros.length > 0) {
        this.formulario.get('passageiroId')?.setValue(this.passageiros[0].id);
      }
    });

    this.portoesService.listar().subscribe((portoes) => {
      this.portoes = portoes;
      if (this.portoes && this.portoes.length > 0) {
        this.formulario.get('portaoId')?.setValue(this.portoes[0].id);
      }
    });

    this.voosService.listar().subscribe((voos) => {
      this.voos = voos;
      if (this.voos && this.voos.length > 0) {
        this.formulario.get('vooId')?.setValue(this.voos[0].id);
      }
    });

    this.formulario = new FormGroup({
      classe: new FormControl(null),
      preco: new FormControl(null),
      passageiroId: new FormControl(null),
      vooId: new FormControl(null),
      portaoId: new FormControl(null),
      pagamentoId: new FormControl(null),
    });
  }

  enviarFormulario(): void {
    const passagem: Passagem = this.formulario.value;
    const observer: Observer<Passagem> = {
      next(_result): void {
        alert('Passagem salva com sucesso.');
      },
      error(_error): void {
        alert('Erro ao salvar!');
        console.log(_error)
      },
      complete(): void {},
    };
    /*
    if (????) {
      this.carrosService.alterar(carro).subscribe(observer);
    } else {
    */
    this.passagensService.cadastrar(passagem).subscribe(observer);
  }
}
