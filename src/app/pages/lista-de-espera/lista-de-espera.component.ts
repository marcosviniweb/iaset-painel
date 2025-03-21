import { Component, inject, OnInit } from '@angular/core';
import { UserData } from '../../core/models/userData.model';
import { Observable, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MockService } from '../../core/services/mock.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-lista-de-espera',
  imports: [MatTableModule, CommonModule, MatDialogModule],
  templateUrl: './lista-de-espera.component.html',
  styleUrl: './lista-de-espera.component.scss'
})

export class ListaDeEsperaComponent implements OnInit {
  private mockService = inject(MockService)
  private dialog = inject(MatDialog)
  columns = [
    {header:'Nome', property:'name'},
    {header:'CPF', property:'cpf'},
    {header:'Matrícula', property:'matricula'},
    
  ];
  displayedColumns = this.columns.map((c) => c.property);
  
  protected dataSource$!: Observable<UserData[]>;

  ngOnInit(): void {
    this.dataSource$ = this.mockService.getUsersAway()
    .pipe(tap(value=> console.log(value)))
  }

  openDialog(){
    this.dialog.open(FormComponent, {
      height:'720px',
      minWidth:'800px '
    })
  }
}
