import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanhiaAerea } from 'src/app/models/CompanhiaAerea';
import { CompanhiasAereasService } from 'src/app/services/companhias-aereas.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-companhias-aereas',
  templateUrl: './companhias-aereas.component.html',
  styleUrls: ['./companhias-aereas.component.css'],
})
export class CompanhiasAereasComponent implements OnInit {
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
  companhiasSubject = new BehaviorSubject<CompanhiaAerea[]>([]);
  result = this.companhiasSubject.asObservable();

  // Busca
  companhiaSubject = new BehaviorSubject<CompanhiaAerea[]>([]);
  resultBusca = this.companhiaSubject.asObservable();

  constructor(private companhiasServive: CompanhiasAereasService) {}

  ngOnInit(): void {
    // Formulario Cadastro
    this.tituloFormularioCadastrar = 'Cadastrar';
    this.formularioCadastro = new FormGroup({
      nome: new FormControl(null),
      pais: new FormControl(null),
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
      pais: new FormControl(null),
    });

    // Formulario Buscar
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Listagem
    this.listar();
  }

  cadastrar(): void {
    const companhia: CompanhiaAerea = this.formularioCadastro.value;
    this.companhiasServive.cadastrar(companhia).subscribe((result) => {
      alert(`Cadastrado realizado com sucesso!`);
      window.location.reload();
    });
  }

  excluir(): void {
    const id: number = this.formularioExclusao.get('id')?.value;
    if (id) {
      this.companhiasServive.excluir(id).subscribe((result) => {
        alert(`Excluido com sucesso!`);
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const companhia: CompanhiaAerea = this.formularioAtualizar.value;
    this.companhiasServive.atualizar(companhia).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  listar(): void {
    this.companhiasServive.listar().subscribe((result) => {
      this.companhiasSubject.next(result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;

    if (id) {
      this.companhiasServive.buscar(id).subscribe((companhia) => {
        this.companhiaSubject.next([companhia]); // Atualiza o BehaviorSubject com o resultado da busca
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
