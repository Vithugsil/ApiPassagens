import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Portao } from 'src/app/models/Portao';
import { PortoesService } from 'src/app/services/portoes.service';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portoes',
  templateUrl: './portoes.component.html',
  styleUrls: ['./portoes.component.css'],
})
export class PortoesComponent implements OnInit {
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
  portoesBuscados!: Portao[];
  portoesBuscadosSubject = new BehaviorSubject<Portao[]>([]);
  resultBuscados = this.portoesBuscadosSubject.asObservable();

  //Componentes para listagem
  portoes!: Portao[];
  portaoSubject = new BehaviorSubject<Portao[]>([]);
  result = this.portaoSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private portoesService: PortoesService,
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
      codigo: new FormControl(null),
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
      codigo: new FormControl(null),
      aeroportoId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const portao: Portao = this.formularioCadastro.value;
    const observer: Observer<Portao> = {
      next(_result): void {
        alert('Cadastro feito com sucesso.');
        window.location.reload();
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.portoesService.cadastrar(portao).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;

    if (idExclusao) {
      this.portoesService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizar(): void {
    const portao: Portao = this.formularioAtualizar.value;

    this.portoesService.atualizar(portao).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  exibirLista(): void {
    this.portoesService.listar().subscribe((_result) => {
      this.portaoSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.portoesService.buscar(id).subscribe((result) => {
        this.portoesBuscadosSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
