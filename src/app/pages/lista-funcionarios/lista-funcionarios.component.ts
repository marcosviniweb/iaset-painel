import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CoreService } from '../../core/services/core.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserData } from '../../core/models/userData.model';
import { FormComponent } from '../../components/form/form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CardViewComponent } from '../card-view/card-view.component';
@Component({
  selector: 'app-lista-funcionarios',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DialogModule],
  templateUrl: './lista-funcionarios.component.html',
  styleUrl: './lista-funcionarios.component.scss'
})
export class ListaFuncionariosComponent implements OnInit {
  private serviceData = inject(CoreService);
  private dialog = inject(Dialog);

  protected searchBar = new FormControl('');

  protected users$!: Observable<UserData[]>;

  ngOnInit(): void {
    this.users$ = this.serviceData.getAllUser()

    this.searchBar.valueChanges.subscribe((value) => {
      const searchTerm = value as string;
      this.searchUser(searchTerm);
    });
  }
  searchUser(searchTerm: string) {
    const normalizedSearchTerm = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
   this.users$ = this.serviceData
      .getAllUser()
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
        data:{user:userData, formType:'user'},
      maxWidth:'1000px',
       panelClass: 'responsive-dialog',
    })
    .closed
    .subscribe((result)=> {
      if(result === 'deleted'){
        this.users$ = this.serviceData.getAllUser('newRequest')
      }
    });
  }
  openCardView(userData:UserData) {
    
    this.dialog.open(CardViewComponent, {
        data:{user:userData, type:'user'},
        width:'fit-content',
        height:'100%',
        maxHeight: '500px',
        maxWidth:'450px',
        panelClass: 'responsive-dialog',
        backdropClass:'card-backdrop'
    })
    
  }

  
}
