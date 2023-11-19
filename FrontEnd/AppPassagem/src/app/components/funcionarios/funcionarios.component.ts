import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  formulario: any;
  formularioExclusao: any;
  formularioAtualizar: any;
  // formularioBuscarId: any;
  tituloFormularioCadastro: string = '';
  tituloFormularioExclusao: string = '';
  tituloFormularioAtualizar: string = '';
  // tituloFormularioBuscarId  : string = 'Buscar Funcionário'
  aeroportos: Array<Aeroporto> | undefined;
  funcionariosBuscados!: Funcionario[];
  funcionariosBuscadosSubject = new BehaviorSubject<Funcionario[]>([]);
  resultBuscados = this.funcionariosBuscadosSubject.asObservable();

  //Componentes para listagem
  funcionarios!: Funcionario[];
  funcionarioSubject = new BehaviorSubject<Funcionario[]>([]);
  result = this.funcionarioSubject.asObservable();

  formularioBusca: any;

  formularioSelecionado: string = 'cadastro';

  constructor(
    private funcionariosService: FuncionariosService,
    private aeroportosService: AeroportosService
  ) {}

  ngOnInit(): void {
    //Formulario de cadastro
    this.tituloFormularioCadastro = 'Novo Funcionário';
    this.aeroportosService.listar().subscribe((aeroportos) => {
      this.aeroportos = aeroportos;
      if (this.aeroportos && this.aeroportos.length > 0) {
        this.formulario.get('aeroportoId')?.setValue(this.aeroportos[0].id);
      }
    });

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      cargo: new FormControl(null),
      aeroportoId: new FormControl(null),
    });

    // Formulario Exclusão
    this.tituloFormularioExclusao = 'Exlcuir Funcionario';
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    });

    //Formulario Atualizar
    this.tituloFormularioAtualizar = 'Atualizar Funcionário';
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

  enviarFormulario(): void {
    const funcionario: Funcionario = this.formulario.value;
    const observer: Observer<Funcionario> = {
      next(_result): void {
        alert('Funcionário salvo com sucesso.');
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
    this.funcionariosService.cadastrar(funcionario).subscribe(observer);
  }

  excluirFuncionario(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.funcionariosService.excluir(idExclusao).subscribe((result) => {
        alert('Funcionario excluído com sucesso!');
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  atualizarFormulario(): void {
    const aeroporto: Funcionario = this.formularioAtualizar.value;
    this.funcionariosService.atualizar(aeroporto).subscribe((result) => {
      alert('Aeroporto atualizado com sucesso!');
    });
  }

  exibirLista(): void {
    this.funcionariosService.listar().subscribe((_funcionarios) => {
      this.funcionarioSubject.next(_funcionarios);
    });
  }

  buscarFuncionarioPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.funcionariosService.buscar(id).subscribe((funcionario) => {
        this.funcionariosBuscadosSubject.next([funcionario]); // Atualiza o BehaviorSubject com o resultado da busca
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
