import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Passageiro } from 'src/app/models/Passageiro';
import { PassageirosService } from 'src/app/services/passageiros.service';

@Component({
  selector: 'app-passageiros',
  templateUrl: './passageiros.component.html',
  styleUrls: ['./passageiros.component.css'],
})
export class PassageirosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';

  constructor(private passageirosService: PassageirosService) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Passageiro';
    this.formulario = new FormGroup({
      tipo: new FormControl(null),
    });
  }
  enviarFormulario(): void {
    const passageiro: Passageiro = this.formulario.value;
    this.passageirosService.cadastrar(passageiro).subscribe((result) => {
      alert('Passageiro inserido com sucesso.');
    });
  }
}
