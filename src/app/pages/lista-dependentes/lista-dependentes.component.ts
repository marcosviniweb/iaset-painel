import { Dependent } from './../../core/models/dependents.model';
import { Component, inject } from '@angular/core';
import { FormDependentComponent } from '../../components/form-dependent/form-dependent.component';
import { map, Observable, tap  } from 'rxjs';
import { CoreService } from '../../core/services/core.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CardViewComponent } from '../card-view/card-view.component';


@Component({
  selector: 'app-lista-dependentes',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DialogModule],
  templateUrl: './lista-dependentes.component.html',
  styleUrl: './lista-dependentes.component.scss'
})
export class ListaDependentesComponent {
  private serviceData = inject(CoreService);
  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute)
  protected searchBar = new FormControl('');

  protected dependents$!: Observable<Dependent[]>;
  userName = ''
  ngOnInit(): void {
    this.route.queryParams
    .subscribe((param)=>{
      console.log(param)
      if(param['id']){
        const id  = param['id']
        this.userName = param['userName']
       this.getUserDependents(id)
      }else{
        console.log('query')
        this.dependents$ = this.serviceData.getDependents(true)
        this.userName = ''
      }
    })
    

    this.searchBar.valueChanges.subscribe((value) => {
      const searchTerm = value as string;
      this.searchUser(searchTerm);
    });
  }
  searchUser(searchTerm: string) {
    const normalizedSearchTerm = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    this.dependents$ = this.serviceData
      .getDependents()
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
  getUserDependents(userId:number){
    this.dependents$ = this.serviceData.getUserDependents(userId).pipe(tap(value=> console.log(value)))
  }
  openDialog(dependentData: Dependent) {


    this.dialog.open(FormDependentComponent, {
      data:{user:dependentData, formType:'dependent'},
      maxWidth:'800px',
      panelClass: 'responsive-dialog',
    })
      .closed
      .subscribe((result) => {
        console.log(result)
        this.dependents$ = this.serviceData.getDependents(true)
      });
  }

  openCardView(dependent:Dependent) {
    
    this.dialog.open(CardViewComponent, {
      data:{user:dependent, type:'dependent'},
        width:'fit-content',
        height:'fit-content',
        maxWidth:'500px',
        panelClass: 'responsive-dialog',
        backdropClass:'card-backdrop'
    })
    
  }

}
