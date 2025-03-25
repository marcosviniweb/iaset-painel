import { Component, inject, OnInit } from '@angular/core';
import { UserData } from '../../core/models/userData.model';
import { map, Observable, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { CoreService } from '../../core/services/core.service';
import { FormControl, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormDependentComponent } from '../../components/form-dependent/form-dependent.component';


@Component({
  selector: 'app-lista-de-espera',
  imports: [MatTableModule, CommonModule, DialogModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lista-de-espera.component.html',
  styleUrl: './lista-de-espera.component.scss',
})
export class ListaDeEsperaComponent implements OnInit {
  private serviceData = inject(CoreService);
  private dialog = inject(Dialog);
  private route = inject(Router)

  protected searchBar:FormControl<string> = new UntypedFormControl('');
  protected listType:FormControl<'userList' | 'waitingList'> = new UntypedFormControl('userList');

  protected list$!: Observable<any>;

  ngOnInit(): void {
    this.list$ = this.serviceData.getWaitingList(this.listType.value)
    .pipe(tap((value)=> console.log(value))); 

    this.searchBar.valueChanges.subscribe((value) => {
      const searchTerm = value as string;
      this.searchUser(searchTerm);
    });
    this.listType.valueChanges
    .subscribe((type)=> {
      this.list$ = this.serviceData.getWaitingList(type)
    })
  }
  
  
  searchUser(searchTerm: string) {
    const normalizedSearchTerm = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
   this.list$ = this.serviceData
      .getWaitingList(this.listType.value)
      .pipe(
        map((users) =>
          users.filter(
            (user) =>
              user.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalizedSearchTerm) ||
              user.cpf.toLowerCase().includes(normalizedSearchTerm)
          )
        )
      );
  }

  openDialog(userData:UserData) {
  
    
    this.dialog.open(FormComponent, {
      data:{user:userData, formType:'waitingList'},
       panelClass: 'responsive-dialog',
       maxWidth:'1000px'
      
    }).closed.subscribe((result)=> console.log(result));
  }
  openDialogDependent(userData:UserData) {
  
    
    this.dialog.open(FormDependentComponent, {
      data:{user:userData, formType:'waitingList'},
       panelClass: 'responsive-dialog',
       maxWidth:'800px'
      
    }).closed.subscribe((response)=>{
      if(response === 'sucess'){
       this.list$ = this.serviceData.getWaitingList(this.listType.value, 'newRequest')
      }
    });
  }

  
}
