import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Bagagem } from 'src/app/models/Bagagem';
import { BagagensService } from 'src/app/services/bagagens.service';
import { Passageiro } from 'src/app/models/Passageiro';
import { PassageirosService } from 'src/app/services/passageiros.service';

@Component({
  selector: 'app-bagagens',
  templateUrl: './bagagens.component.html',
  styleUrls: ['./bagagens.component.css'],
})
export class BagagensComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  passageiros: Array<Passageiro> | undefined;

  constructor(
    private bagagensService: BagagensService,
    private passageirosService: PassageirosService
  ) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Bagagem';

    this.passageirosService.listar().subscribe((passageiros) => {
      this.passageiros = passageiros;
      if (this.passageiros && this.passageiros.length > 0) {
        this.formulario
          .get('passageiroId')
          ?.setValue(this.passageiros[0].id);
      }
    });


    this.formulario = new FormGroup({
      peso: new FormControl(null),
      passageiroId: new FormControl(null),
    });
  }

  enviarFormulario(): void {
    const bagagem: Bagagem = this.formulario.value;
    const observer: Observer<Bagagem> = {
      next(_result): void {
        alert('Bagagem salva com sucesso.');
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
    this.bagagensService.cadastrar(bagagem).subscribe(observer);
  }
}
