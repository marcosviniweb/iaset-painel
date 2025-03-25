
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { UserData } from '../../core/models/userData.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, CpfCnpjMaskDirective, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent implements OnInit {
  private dialogRef = inject(DialogRef)
  private serviceData = inject(CoreService)
  private fb = inject(NonNullableFormBuilder)
  private dialogData = inject(DIALOG_DATA)
  updateForm = this.fb.group({
    name: ['', [Validators.minLength(2)]],
    birthDay: [''],
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
  updateMessage = {status:'', message:''}
  formType:'waitingList' | 'user' = 'waitingList'
  userData!:UserData
  profileImg: string | undefined; // Variável para armazenar a URL da imagem
  ngOnInit(): void {
    this.formType = this.dialogData.formType
    this.formatDataDialog(this.dialogData.user)
    this.userData = this.dialogData.user
  }


  imgFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.updateForm.get('photo')?.setValue(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImg = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  approveUser() {
    const formData = new FormData()
    const data = this.updateForm.value as any
    console.log(data)
    formData.append('status', 'true')
    Object.keys(data).map((key) => {
      if (key === 'cpf' || key === 'name') {
        formData.append(key,data[key])
      }
    })
    formData.forEach((value, key)=> console.log(key, value))
    this.serviceData.updateUserData(this.userData.id, formData)
    .subscribe({
      next:(response)=>{
        console.log(response)
        alert('Usuario Aprovado')
        this.dialogRef.close('approve')
      },
      error:(error)=>{
        throw error
      }
    })

  }

  recuseUser(){
    confirm(`Deseja realmente deletar o funcionário ${this.userData.name} da lista de cadastro ?`)
    this.serviceData.deleteUsers(this.userData.id)
    .subscribe({
      next:()=>{
        alert('Usuário foi apagado.')
        this.dialogRef.close('deleted')   
      },
      error:(error)=>{
        throw error
      }
    })
  }

  formatDataDialog(userData: any) {
    console.log(userData)
    this.profileImg =  'http://iaset.com.br/backend-iaset' + userData.photo
    userData.birthDay = this.formatarData(userData.birthDay);
    this.updateForm.patchValue(userData);
  }

  formatarData(dataISO: string): string {
    if (!dataISO) return '';

    const data = new Date(dataISO);

    // Obtém os componentes da data
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(data.getUTCDate()).padStart(2, '0');

    // Retorna no formato yyyy-MM-dd
    return `${ano}-${mes}-${dia}`;
  };


  editUserProfile(){
    
    
    const formData = new FormData();
    Object.keys(this.updateForm.controls).forEach(key => {
      key !== 'confirmPassowrd' ?
        formData.append(key, this.updateForm.get(key)?.value) : null
    });
    

    
    this.serviceData.updateUserData(this.userData.id, formData)
    .subscribe({
      next:(response)=> {
   
 
        this.updateMessage = {status:'sucess', message:'Informações atualizadas com sucesso !'}
      },
      error:(error:HttpErrorResponse)=>{
        const errorMessage = error.error.message == 'Internal server error'? null : error.error.message
 
        this.updateMessage = {
          status:'error', 
          message:errorMessage? errorMessage+' cod:'+error.status:'Ocorreu um erro durante a atualização, tente novamente. cod:'+error.status}
          console.error('Erro ao atualizar perfil:', error)
      }
    })
  }
  
  closeDialog(){
    this.dialogRef.close()
  }

  
}
