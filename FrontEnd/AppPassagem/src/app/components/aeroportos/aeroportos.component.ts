import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-aeroportos',
  templateUrl: './aeroportos.component.html',
  styleUrls: ['./aeroportos.component.css'],
})
export class AeroportosComponent implements OnInit {
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

  // Listagem de Aeroportos
  aeroportosSubject = new BehaviorSubject<Aeroporto[]>([]);
  result = this.aeroportosSubject.asObservable();

  // Busca de Aeroporto
  aeroportoSubject = new BehaviorSubject<Aeroporto[]>([]);
  resultBusca = this.aeroportoSubject.asObservable();

  constructor(private aeroportosService: AeroportosService) {}

  ngOnInit(): void {
    // Formulario Cadastro
    this.tituloFormularioCadastrar = 'Cadastrar Aeroporto';
    this.formularioCadastro = new FormGroup({
      nome: new FormControl(null),
      cidade: new FormControl(null),
    });

    // Formulario Exclusão
    this.tituloFormularioExclusao = 'Excluir Aeroporto';
    this.formularioExclusao = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Atualização
    this.tituloFormularioAtualizar = 'Atualizar Aeroporto';
    this.formularioAtualizar = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      cidade: new FormControl(null),
    });

    // Formulario Buscar
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });

    // Formulario Listagem
    this.listarAeroportos();
  }

  cadastrarAeroporto(): void {
    const aeroporto: Aeroporto = this.formularioCadastro.value;
    this.aeroportosService.cadastrar(aeroporto).subscribe((result) => {
      alert(
        `O aeroporto ${aeroporto.nome} em ${aeroporto.cidade} foi cadastrado!`
      );
      window.location.reload();
    });
  }

  excluirAeroporto(): void {
    const id: number = this.formularioExclusao.get('id')?.value;
    if (id) {
      this.aeroportosService.excluir(id).subscribe((result) => {
        alert(`O aeroporto com ID ${id} foi excluido!`);
        window.location.reload();
      });
    } else {
      alert('Insira um ID válido.');
      window.location.reload();
    }
  }

  atualizarAeroporto(): void {
    const aeroporto: Aeroporto = this.formularioAtualizar.value;
    this.aeroportosService.atualizar(aeroporto).subscribe((result) => {
      alert('Aeroporto atualizado com sucesso!');
      window.location.reload();
    });
  }

  listarAeroportos(): void {
    this.aeroportosService.listar().subscribe((_aeroportos) => {
      this.aeroportosSubject.next(_aeroportos);
    });
  }

  buscarAeroportoPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;
    
    if (id) {
      this.aeroportosService.buscar(id).subscribe((aeroporto) => {
        this.aeroportoSubject.next([aeroporto]); // Atualiza o BehaviorSubject com o resultado da busca
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
