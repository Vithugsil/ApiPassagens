import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AeroportosService } from 'src/app/Services/aeroportos.service'; 
import { Aeroporto } from 'src/app/Classes/Aeroporto';

@Component({
  selector: 'app-aeroporto',
  templateUrl: './aeroportos.component.html',
  styleUrls: ['./aeroportos.component.css']
})
export class AeroportosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  
  constructor(private aeroportosService : AeroportosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Aeroporto';
    this.formulario = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      cidade: new FormControl(null)
    })
  }
  enviarFormulario(): void {
    const aeroporto : Aeroporto = this.formulario.value;
    this.aeroportosService.cadastrar(aeroporto).subscribe(result => {
      alert('Carro inserido com sucesso.');
    })
  } 
}
