import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Aviao } from 'src/app/models/Aviao';
import { AvioesService } from 'src/app/services/avioes.service';
import { CompanhiaAerea } from 'src/app/models/CompanhiaAerea';
import { CompanhiasAereasService } from 'src/app/services/companhias-aereas.service';

@Component({
  selector: 'app-avioes',
  templateUrl: './avioes.component.html',
  styleUrls: ['./avioes.component.css'],
})

export class AvioesComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  companhias: Array<CompanhiaAerea> | undefined;

  constructor(
    private avioesService: AvioesService,
    private companhiasService: CompanhiasAereasService
  ) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Avião';

    this.companhiasService.listar().subscribe((companhias) => {
      this.companhias = companhias;
      if (this.companhias && this.companhias.length > 0) {
        this.formulario.get('companhiaAereaId')?.setValue(this.companhias[0].id);
      }
    });

    this.formulario = new FormGroup({
      modelo: new FormControl(null),
      companhiaAereaId: new FormControl(null),
    });
  }
  
  enviarFormulario(): void {
    const aviao: Aviao = this.formulario.value;
    const observer: Observer<Aviao> = {
      next(_result): void {
        alert('Avião salvo com sucesso.');
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
    this.avioesService.cadastrar(aviao).subscribe(observer);
  }
}
