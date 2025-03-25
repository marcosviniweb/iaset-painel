import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Subject } from 'rxjs';
import { Dependent } from '../../core/models/dependents.model';
import { CommonModule } from '@angular/common';
import { ApiUrl } from '../../core/env/apiUrl';
import { CpfCnpjMaskDirective } from '../../shared/directives/cpfMask.directive';

@Component({
  selector: 'app-form-dependent',
  imports: [CommonModule, ReactiveFormsModule, CpfCnpjMaskDirective],
  templateUrl: './form-dependent.component.html',
  styleUrl: './form-dependent.component.scss',
})
export class FormDependentComponent {
  private fb = inject(NonNullableFormBuilder);
  private serviceData = inject(CoreService);
  private dialogData = inject<{
    user: Dependent;
    formType: 'waitingList' | 'dependent';
  }>(DIALOG_DATA);
  private dialogRef = inject(DialogRef);

  dependentForm = this.fb.group({
    name: [''],
    cpf: [''],
    birthDate: [''],
    relationship: [''],
    file: new FormControl<File | null>(null),
    hasDisability: [false],
  });

  updateMessage = { status: '', message: '' };
  destroy$ = new Subject();
  fileName = '';
  warnMsg = { status: false, msg: 'Já cadastrado(a)' };
  formType: 'dependent' | 'waitingList' = 'waitingList';
  depId!: number;
  userData = {};
  docUrl = ApiUrl.urlImg;
  ngOnInit(): void {
    console.log(this.dialogData);
    this.setDendentData(this.dialogData);
  }

  setDendentData(dependentData: {
    user: any;
    formType: 'waitingList' | 'dependent';
  }) {
    if (dependentData) {
      this.userData = dependentData.user;
      this.formType = dependentData.formType;
      dependentData.user.birthDate = this.formatarData(
        dependentData.user.birthDate
      );
      this.dependentForm.patchValue(dependentData.user);
      this.dependentForm.controls.relationship.disable();
    }
  }

  verifySpouse(dependents: Dependent[]) {
    if (!!dependents.find((dep) => dep.relationship.includes('conjuge'))) {
      this.dependentForm.controls.relationship.setValue('filho');
      this.dependentForm.controls.relationship.disable();
      this.warnMsg.status = true;
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
  }
  closeDialog() {
    this.dialogRef.close();
  }

  updateDependent() {
    if (confirm('Deseja alterar os dados do dependente ?')) {
      const formData = new FormData();

      Object.keys(this.dependentForm.controls).forEach((key) => {
        key !== 'hasDisability'
          ? formData.append(key, this.dependentForm.get(key)?.value)
          : null;
      });

      console.log(this.dependentForm.value);

      this.serviceData
        .updateDependent(
          this.dialogData.user.userId,
          this.dialogData.user.id,
          formData
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            this.updateMessage = {
              status: 'sucess',
              message: 'Dependente alterado com sucesso !',
            };
            this.dialogRef.close('sucess');
          },
          error: (error: HttpErrorResponse) => {
            this.updateMessage = {
              status: 'error',
              message:
                'Erro ao cadastrar o dependente - ' + 'Cod:' + error.status,
            };
            throw error;
          },
        });
    }
  }

  approveDependent() {
    const dependentData = this.dialogData.user;
    this.serviceData.approveDependent(dependentData.id).subscribe({
      next: () => {
        alert('O Dependente foi Aprovado !');
        this.dialogRef.close('sucess');
      },
      error: (error) => {
        this.updateMessage = {
          status: 'error',
          message: `Ocorreu um erro, tente novamente cod: ${error.status}`,
        };
        throw error;
      },
    });
  }
  deleteDependent() {
    const dependentData = this.dialogData.user;
    if (
      confirm(
        `Deseja EXCLUIR o dependente: ${dependentData.name} do funcionário(a): ${dependentData.user.name} ?`
      )
    ) {
      this.serviceData
        .deleteDependent(dependentData.userId, dependentData.id)
        .subscribe({
          next: () => {
            alert('O Dependente foi removido !');
            this.dialogRef.close('sucess');
          },
          error: (error) => {
            throw error;
          },
        });
    }
  }
}
