import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Bagagem } from 'src/app/models/Bagagem';
import { BagagensService } from 'src/app/services/bagagens.service';
import { Passageiro } from 'src/app/models/Passageiro';
import { PassageirosService } from 'src/app/services/passageiros.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bagagens',
  templateUrl: './bagagens.component.html',
  styleUrls: ['./bagagens.component.css'],
})
export class BagagensComponent implements OnInit {
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
  passageiros: Array<Passageiro> | undefined;
  bagagensBuscadas!: Bagagem[];
  bagagensBuscadasSubject = new BehaviorSubject<Bagagem[]>([]);
  resultBuscados = this.bagagensBuscadasSubject.asObservable();

  //Componentes para listagem
  bagagens!: Bagagem[];
  bagagemSubject = new BehaviorSubject<Bagagem[]>([]);
  result = this.bagagemSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private bagagensService: BagagensService,
    private passageirosService: PassageirosService
  ) {}

  ngOnInit(): void {
    //Formulario de cadastro
    this.tituloFormularioCadastro = 'Cadastrar';
    this.passageirosService.listar().subscribe((passageiros) => {
      this.passageiros = passageiros;
      if (this.passageiros && this.passageiros.length > 0) {
        this.formularioCadastro
          .get('passageiroId')
          ?.setValue(this.bagagens[0].id);
      }
    });

    this.formularioCadastro = new FormGroup({
      peso: new FormControl(null),
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
      peso: new FormControl(null),
      passageiroId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const bagagem: Bagagem = this.formularioCadastro.value;
    const observer: Observer<Bagagem> = {
      next(_result): void {
        alert('Cadastro feito com sucesso.');
        window.location.reload();
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.bagagensService.cadastrar(bagagem).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;

    if (idExclusao) {
      this.bagagensService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const bagagem: Bagagem = this.formularioAtualizar.value;

    this.bagagensService.atualizar(bagagem).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  exibirLista(): void {
    this.bagagensService.listar().subscribe((_result) => {
      this.bagagemSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.bagagensService.buscar(id).subscribe((result) => {
        this.bagagensBuscadasSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
