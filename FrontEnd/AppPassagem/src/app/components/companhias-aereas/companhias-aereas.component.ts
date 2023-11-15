import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanhiasAereasService } from 'src/app/services/companhias-aereas.service';
import { CompanhiaAerea } from 'src/app/models/CompanhiaAerea';

@Component({
  selector: 'app-companhias',
  templateUrl: './companhias-aereas.component.html',
  styleUrls: ['./companhias-aereas.component.css'],
})

export class CompanhiasAereasComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';

  constructor(private companhiasService: CompanhiasAereasService) {}

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Companhia';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      pais: new FormControl(null),
    });
  }
  enviarFormulario(): void {
    const companhia: CompanhiaAerea = this.formulario.value;
    this.companhiasService.cadastrar(companhia).subscribe((result) => {
      alert('Aeroporto inserido com sucesso.');
    });
  }
}
