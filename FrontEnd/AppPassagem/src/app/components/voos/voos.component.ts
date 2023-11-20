import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observer } from 'rxjs';
import { Voo } from 'src/app/models/Voo';
import { VoosService } from 'src/app/services/voos.service';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service'; 
import { Aviao } from 'src/app/models/Aviao';
import { AvioesService } from 'src/app/services/avioes.service';

@Component({
  selector: 'app-voos',
  templateUrl: './voos.component.html',
  styleUrls: ['./voos.component.css'],
})

export class VoosComponent implements OnInit {
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
  avioes: Array<Aviao> | undefined;
  aeroportosOrigem: Array<Aeroporto> | undefined;
  aeroportosDestino: Array<Aeroporto> | undefined;
  voosBuscados!: Voo[];
  voosBuscadosSubject = new BehaviorSubject<Voo[]>([]);
  resultBuscados = this.voosBuscadosSubject.asObservable();

  //Componentes para listagem
  voos!: Voo[];
  vooSubject = new BehaviorSubject<Voo[]>([]);
  result = this.vooSubject.asObservable();

  formularioSelecionado: string = 'cadastro';

  constructor(
    private voosService: VoosService,
    private avioesService: AvioesService,
    private aeroportosService: AeroportosService,
  ) {}

  ngOnInit(): void {
    //Formulario de cadastro
    
    this.tituloFormularioCadastro = 'Cadastrar';

    this.aeroportosService.listar().subscribe((aeroportos) => {
      this.aeroportosOrigem = aeroportos;
      if (this.aeroportosOrigem && this.aeroportosOrigem.length > 0) {
        this.formularioCadastro
          .get('origemAeroportoId')
          ?.setValue(this.aeroportosOrigem[0].id);
      }
    });

    this.aeroportosService.listar().subscribe((aeroportos) => {
      this.aeroportosDestino = aeroportos;
      if (this.aeroportosDestino && this.aeroportosDestino.length > 0) {
        this.formularioCadastro
          .get('destinoAeroportoId')
          ?.setValue(this.aeroportosDestino[0].id);
      }
    });

    this.avioesService.listar().subscribe((avioes) => {
      this.avioes = avioes;
      if (this.avioes && this.avioes.length > 0) {
        this.formularioCadastro
          .get('aviaoId')
          ?.setValue(this.avioes[0].id);
      }
    });

    this.formularioCadastro = new FormGroup({
      numero: new FormControl(null),
      aviaoId: new FormControl(null),
      origemAeroportoId: new FormControl(null),
      destinoAeroportoId: new FormControl(null),
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
      numero: new FormControl(null),
      aviaoId: new FormControl(null),
      origemAeroportoId: new FormControl(null),
      destinoAeroportoId: new FormControl(null),
    });

    //Listar
    this.exibirLista();

    this.formularioBusca = new FormGroup({
      id: new FormControl(null),
    });
  }

  cadastrar(): void {
    const voo: Voo = this.formularioCadastro.value;
    console.log(voo);
    
    const observer: Observer<Voo> = {
      next(_result): void {
        alert('Cadastro feito com sucesso.');
        window.location.reload();
      },
      error(_error): void {
        alert('Erro ao cadastrar!');
      },
      complete(): void {},
    };

    this.voosService.cadastrar(voo).subscribe(observer);
  }

  excluir(): void {
    const idExclusao: number = this.formularioExclusao.get('id')?.value;
    
    if (idExclusao) {
      this.voosService.excluir(idExclusao).subscribe((result) => {
        alert('Excluído com sucesso!');
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  atualizar(): void {
    const voo: Voo = this.formularioAtualizar.value;

    this.voosService.atualizar(voo).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  exibirLista(): void {
    this.voosService.listar().subscribe((_result) => {
      this.vooSubject.next(_result);
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.voosService.buscar(id).subscribe((result) => {
        this.voosBuscadosSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
