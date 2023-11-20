import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pagamento } from 'src/app/models/Pagamento';
import { PagamentosService } from 'src/app/services/pagamentos.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css'],
})

export class PagamentosComponent implements OnInit {
  // Formularios
  formularioCadastro: any;
  formularioExclusao: any;
  formularioAtualizar: any;
  formularioBuscar: any;

  // Titulos
  tituloFormularioCadastrar: string = '';
  tituloFormularioExclusao: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioListar: string = '';
  tituloFormularioBuscar: string = '';

  // Titulo inicial
  formularioSelecionado: string = 'cadastro';

  // Listagem
  pagamentosSubject = new BehaviorSubject<Pagamento[]>([]);
  result = this.pagamentosSubject.asObservable();

  // Busca
  pagamentoSubject = new BehaviorSubject<Pagamento[]>([]);
  resultBusca = this.pagamentoSubject.asObservable();

  constructor(private pagamentosService: PagamentosService) {}

  ngOnInit(): void {
    // Formulario Cadastro
    this.tituloFormularioCadastrar = 'Cadastrar';
    this.formularioCadastro = new FormGroup({
      tipo: new FormControl(null),
    });

    // Formulario Exclusão
    this.tituloFormularioExclusao = 'Excluir';
    this.formularioExclusao = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Atualização
    this.tituloFormularioAtualizar = 'Atualizar';
    this.formularioAtualizar = new FormGroup({
      id: new FormControl(null),
      tipo: new FormControl(null),
    });

    // Formulario Buscar
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Listagem
    this.listar();
  }

  cadastrar(): void {
    const pagamento: Pagamento = this.formularioCadastro.value;
    this.pagamentosService.cadastrar(pagamento).subscribe((result) => {
      alert(`Cadastrado realizado com sucesso!`);
      window.location.reload();
    });
  }

  excluir(): void {
    const id: number = this.formularioExclusao.get('id')?.value;
    if (id) {
      this.pagamentosService.excluir(id).subscribe((result) => {
        alert(`Excluido com sucesso!`);
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const pagamento: Pagamento = this.formularioAtualizar.value;
    this.pagamentosService.atualizar(pagamento).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  listar(): void {
    this.pagamentosService.listar().subscribe((result) => {
      this.pagamentosSubject.next(result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;

    if (id) {
      this.pagamentosService.buscar(id).subscribe((pagamento) => {
        this.pagamentoSubject.next([pagamento]); // Atualiza o BehaviorSubject com o resultado da busca
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
