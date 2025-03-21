import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private fb = inject(NonNullableFormBuilder)
  updateForm = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    birthDay:[''],
    matricula: ['', []], 
    cpf: ['', []], 
    rg: ['', []],
    vinculo: ['', []], 
    lotacao: ['', []], 
    endereco: ['', []], 
    email: ['', [Validators.email]], 
    phone: ['', []], 
    photo: new FormControl<File | null>(null)
  })
  
  profileImg: string | undefined; // Variável para armazenar a URL da imagem
}
