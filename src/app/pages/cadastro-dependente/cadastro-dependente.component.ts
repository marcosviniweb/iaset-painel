import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subject, takeUntil, tap } from 'rxjs';
import { Dependent } from '../../core/models/dependents.model';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserData } from '../../core/models/userData.model';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';

@Component({
  selector: 'app-cadastro-dependente',
  imports: [DialogModule, MatDialogModule, CommonModule, ReactiveFormsModule, FormsModule, CpfCnpjMaskDirective],
  templateUrl: './cadastro-dependente.component.html',
  styleUrl: './cadastro-dependente.component.scss'
})
export class CadastroDependenteComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private serviceData = inject(CoreService);
  private route = inject(ActivatedRoute)
  
  dependentForm = this.fb.group({
    name: [''],
    cpf: [''],
    birthDate: [''],
    relationship: [''],
    file: new FormControl<File | null>(null),
    hasDisability: [false],
    status:true
  });

  userFormData = {name:'', matricula:''}
  updateMessage = { status: '', message: '' };
  destroy$ = new Subject();
  fileName = '';
  warnMsg = {status:false, msg: 'Já cadastrado(a)'};
  submitType:'set'| 'edit' = 'set'
  depId!:number
  userData!:UserData
  ngOnInit(): void {
    this.route.params
    .subscribe((param)=>{
      if(param['id']){
        const id = param['id']
        firstValueFrom(this.serviceData.getUser(id))
        .then((userData)=>{
          this.userData = userData
          this.setUserData(userData)
          console.log('res', userData)
        })
        .catch((error)=> {
          throw error
        })
        
      }
    })
  }

 
  setUserData(userData:UserData){
    this.userFormData = {name:userData.name, matricula:userData.matricula}
  }

  verifySpouse(dependents:Dependent[]){
    if(!!dependents.find((dep)=> dep.relationship.includes('conjuge'))){
      this.dependentForm.controls.relationship.setValue('filho')
      this.dependentForm.controls.relationship.disable()
      this.warnMsg.status = true
    }
  }
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.fileName = file.name;
      this.dependentForm.get('file')?.setValue(file);
    }
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
 

  setDependent() {
    const formData = new FormData();

    Object.keys(this.dependentForm.controls).forEach(key => {
      key !== 'hasDisability' ?
        formData.append(key, this.dependentForm.get(key)?.value) : null
    });

    this.serviceData.setDependent(this.userData.id, formData).subscribe({
      next: (response) => {
        this.dependentForm.reset()
        this.updateMessage = {
          status: 'sucess',
          message: 'Dependente cadastrado com sucesso !',
        };
      },
      error: (error: HttpErrorResponse) => {
        this.updateMessage = {
          status: 'error',
          message: 'Erro ao cadastrar o dependente - ' + 'Cod:' + error.status,
        };
        throw error;
      },
    });
  }

  // updateDependent(){
  //   const formData = new FormData();

  //   Object.keys(this.dependentForm.controls).forEach(key => {
  //     key !== 'hasDisability' ?
  //       formData.append(key, this.dependentForm.get(key)?.value) : null
  //   });

  //   this.serviceData.updateDependent(this.userData.id, this.depId ,formData).subscribe({
  //     next: (response) => {
  //       console.log(response)
  //       this.updateMessage = {
  //         status: 'sucess',
  //         message: 'Dependente alterado com sucesso !',
  //       };
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.updateMessage = {
  //         status: 'error',
  //         message: 'Erro ao cadastrar o dependente - ' + 'Cod:' + error.status,
  //       };
  //       throw error;
  //     },
  //   });
  // }
}
