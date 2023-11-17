import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Aeroporto } from 'src/app/models/Aeroporto';
import { AeroportosService } from 'src/app/services/aeroportos.service';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  aeroportos: Array<Aeroporto> | undefined;

  constructor(
    private funcionariosService: FuncionariosService,
    private aeroportosService: AeroportosService
  ) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Funcionário';

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
}
