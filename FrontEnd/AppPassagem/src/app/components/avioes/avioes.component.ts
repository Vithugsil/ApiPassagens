import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Aviao } from 'src/app/models/Aviao';
import { AvioesService } from 'src/app/services/avioes.service';
import { CompanhiaAerea } from 'src/app/models/CompanhiaAerea';
import { CompanhiasAereasService } from 'src/app/services/companhias-aereas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-avioes',
  templateUrl: './avioes.component.html',
  styleUrls: ['./avioes.component.css'],
})
export class AvioesComponent implements OnInit {
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
  companhiasAereas: Array<CompanhiaAerea> | undefined;
  avioesBuscados!: Aviao[];
  avioesBuscadosSubject = new BehaviorSubject<Aviao[]>([]);
  resultBuscados = this.avioesBuscadosSubject.asObservable();

  //Componentes para listagem
  avioes!: Aviao[];
  aviaoSubject = new BehaviorSubject<Aviao[]>([]);
  result = this.aviaoSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private avioesService: AvioesService,
    private companhiasService: CompanhiasAereasService
  ) {}

  ngOnInit(): void {
    //Formulario de cadastro
    this.tituloFormularioCadastro = 'Cadastrar';
    this.companhiasService.listar().subscribe((companhiasAereas) => {
      this.companhiasAereas = companhiasAereas;
      if (this.companhiasAereas && this.companhiasAereas.length > 0) {
        this.formularioCadastro.get('companhiaAereaId')?.setValue(this.avioes[0].id);
      }
    });

    this.formularioCadastro = new FormGroup({
      modelo: new FormControl(null),
      companhiaAereaId: new FormControl(null),
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
      modelo: new FormControl(null),
      companhiaAereaId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const aviao: Aviao = this.formularioCadastro.value;
    const observer: Observer<Aviao> = {
      next(_result): void {
        console.log(_result);
        alert('Cadastro feito com sucesso.');
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.avioesService.cadastrar(aviao).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;
    console.log(idExclusao);
    
    if (idExclusao) {
      this.avioesService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  atualizar(): void {
    const aviao: Aviao = this.formularioAtualizar.value;
    console.log(aviao);
    
    this.avioesService.atualizar(aviao).subscribe((result) => {
      alert('Atualizado com sucesso!');
    });
  }

  exibirLista(): void {
    this.avioesService.listar().subscribe((_result) => {
      this.aviaoSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.avioesService.buscar(id).subscribe((result) => {
        this.avioesBuscadosSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
