import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
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

@Component({
  selector: 'app-passagens',
  templateUrl: './passagens.component.html',
  styleUrls: ['./passagens.component.css'],
})
export class PassagensComponent implements OnInit {
  // Formularios
  formularioCadastro: any;
  formularioExclusao: any;
  formularioAtualizar: any;
  formularioBusca: any;

  // Titulos
  tituloFormularioCadastro: string = '';
  tituloFormularioExclusao: string = '';
  tituloFormularioAtualizar: string = '';

  // Busca
  pagamentos: Array<Pagamento> | undefined;
  portoes: Array<Portao> | undefined;
  voos: Array<Voo> | undefined;
  passageiros: Array<Passageiro> | undefined;
  passagensBuscadas!: Passagem[];
  passagensBuscadasSubject = new BehaviorSubject<Passagem[]>([]);
  resultBuscados = this.passagensBuscadasSubject.asObservable();

  //Componentes para listagem
  passagens!: Passagem[];
  passagemSubject = new BehaviorSubject<Passagem[]>([]);
  result = this.passagemSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private passagensService: PassagensService,
    private pagamentosService: PagamentosService,
    private passageirosService: PassageirosService,
    private portoesService: PortoesService,
    private voosService: VoosService
) {}

  ngOnInit(): void {
    //Formulario de cadastro
    this.tituloFormularioCadastro = 'Cadastrar';

    this.pagamentosService.listar().subscribe((pagamentos) => {
      this.pagamentos = pagamentos;
      if (this.pagamentos && this.pagamentos.length > 0) {
        this.formularioCadastro
          .get('pagamentoId')
          ?.setValue(this.pagamentos[0].id);
      }
    });

    this.portoesService.listar().subscribe((portoes) => {
      this.portoes = portoes;
      if (this.portoes && this.portoes.length > 0) {
        this.formularioCadastro
          .get('portaoId')
          ?.setValue(this.portoes[0].id);
      }
    });

    this.voosService.listar().subscribe((voos) => {
      this.voos = voos;
      if (this.voos && this.voos.length > 0) {
        this.formularioCadastro.get('vooId')?.setValue(this.voos[0].id);
      }
    });

     this.passageirosService.listar().subscribe((passageiros) => {
       this.passageiros = passageiros;
       if (this.passageiros && this.passageiros.length > 0) {
         this.formularioCadastro.get('passageiroId')?.setValue(this.passageiros[0].id);
       }
     });

    this.formularioCadastro = new FormGroup({
      classe: new FormControl(null),
      preco: new FormControl(null),
      pagamentoId: new FormControl(null),
      portaoId: new FormControl(null),
      vooId: new FormControl(null),
      passageiroId: new FormControl(null),
    });

    // Formulario Exclusão
    this.tituloFormularioExclusao = 'Excluir';
    this.formularioExclusao = new FormGroup({
      id: new FormControl(null),
    });

    //Formulario Atualizar
    this.tituloFormularioAtualizar = 'Atualizar';
    this.formularioAtualizar = new FormGroup({
      id: new FormControl(null),
      classe: new FormControl(null),
      preco: new FormControl(null),
      pagamentoId: new FormControl(null),
      portaoId: new FormControl(null),
      vooId: new FormControl(null),
      passageiroId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const passagem: Passagem = this.formularioCadastro.value;
    const observer: Observer<Passagem> = {
      next(_result): void {
        console.log(_result);
        alert('Cadastro feito com sucesso.');
        window.location.reload();
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.passagensService.cadastrar(passagem).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;

    if (idExclusao) {
      this.passagensService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  atualizar(): void {
    const passagem: Passagem = this.formularioAtualizar.value;

    this.passagensService.atualizar(passagem).subscribe((result) => {
      alert('Atualizado com sucesso!');
      
    });
  }

  exibirLista(): void {
    this.passagensService.listar().subscribe((_result) => {
      this.passagemSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.passagensService.buscar(id).subscribe((result) => {
        this.passagensBuscadasSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
