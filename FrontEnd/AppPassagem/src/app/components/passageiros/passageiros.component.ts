import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Passageiro } from 'src/app/models/Passageiro';
import { PassageirosService } from 'src/app/services/passageiros.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-passageiros',
  templateUrl: './passageiros.component.html',
  styleUrls: ['./passageiros.component.css'],
})
export class PassageirosComponent implements OnInit {
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
  passageirosSubject = new BehaviorSubject<Passageiro[]>([]);
  result = this.passageirosSubject.asObservable();

  // Busca
  passageiroSubject = new BehaviorSubject<Passageiro[]>([]);
  resultBusca = this.passageiroSubject.asObservable();

  constructor(private passageirosService: PassageirosService) {}

  ngOnInit(): void {
    // Formulario Cadastro
    this.tituloFormularioCadastrar = 'Cadastrar';
    this.formularioCadastro = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
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
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
    });

    // Formulario Buscar
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Listagem
    this.listar();
  }

  cadastrar(): void {
    const passageiro: Passageiro = this.formularioCadastro.value;
    this.passageirosService.cadastrar(passageiro).subscribe((result) => {
      alert(`Cadastrado realizado com sucesso!`);
      window.location.reload();
    });
  }

  excluir(): void {
    const id: number = this.formularioExclusao.get('id')?.value;
    if (id) {
      this.passageirosService.excluir(id).subscribe((result) => {
        alert(`Excluido com sucesso!`);
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const passageiro: Passageiro = this.formularioAtualizar.value;
    this.passageirosService.atualizar(passageiro).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  listar(): void {
    this.passageirosService.listar().subscribe((result) => {
      this.passageirosSubject.next(result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;

    if (id) {
      this.passageirosService.buscar(id).subscribe((passageiro) => {
        this.passageiroSubject.next([passageiro]); // Atualiza o BehaviorSubject com o resultado da busca
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
