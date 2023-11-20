import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
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
  aeroportos: Array<Aeroporto> | undefined;
  funcionariosBuscados!: Funcionario[];
  funcionariosBuscadosSubject = new BehaviorSubject<Funcionario[]>([]);
  resultBuscados = this.funcionariosBuscadosSubject.asObservable();

  //Componentes para listagem
  funcionarios!: Funcionario[];
  funcionarioSubject = new BehaviorSubject<Funcionario[]>([]);
  result = this.funcionarioSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private funcionariosService: FuncionariosService,
    private aeroportosService: AeroportosService
  ) {}

  ngOnInit(): void {
    //Formulario de cadastro
    this.tituloFormularioCadastro = 'Cadastrar';
    this.aeroportosService.listar().subscribe((aeroportos) => {
      this.aeroportos = aeroportos;
      if (this.aeroportos && this.aeroportos.length > 0) {
        this.formularioCadastro
          .get('aeroportoId')
          ?.setValue(this.aeroportos[0].id);
      }
    });

    this.formularioCadastro = new FormGroup({
      nome: new FormControl(null),
      cargo: new FormControl(null),
      aeroportoId: new FormControl(null),
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
      nome: new FormControl(null),
      cargo: new FormControl(null),
      aeroportoId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const funcionario: Funcionario = this.formularioCadastro.value;
    const observer: Observer<Funcionario> = {
      next(_result): void {
        alert('Cadastro feito com sucesso.');
        window.location.reload();
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.funcionariosService.cadastrar(funcionario).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;

    if (idExclusao) {
      this.funcionariosService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const funcionario: Funcionario = this.formularioAtualizar.value;

    this.funcionariosService.atualizar(funcionario).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  exibirLista(): void {
    this.funcionariosService.listar().subscribe((_result) => {
      this.funcionarioSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.funcionariosService.buscar(id).subscribe((result) => {
        this.funcionariosBuscadosSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
