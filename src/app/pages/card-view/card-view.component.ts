import { UserData } from './../../core/models/userData.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { CoreService } from '../../core/services/core.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Dependent } from '../../core/models/dependents.model';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule, UserCardComponent, RouterModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent implements OnInit, OnDestroy {

  // private serviceData = inject(CoreService)
  private dialogData = inject(DIALOG_DATA)
  private dialogRef = inject(DialogRef)
  userCards: any[] = [];

  carouselDirection: 'horizontal' | 'vertical' = 'horizontal';
  currentCardIndex = 0;

  destroy$ = new Subject();
  acessToCard$ = new BehaviorSubject(true)

  ngOnInit(): void {
    this.setCardData()
   

  
  }

  setCardData(){
    if(this.dialogData.type == 'user'){
      this.userCards.push(this.dialogData.user)
      this.acessToCard$.next(this.checkUserData(this.dialogData.user))
    }else{
      this.userCards.push(this.dialogData.user)
      this.acessToCard$.next(this.checkDependentData(this.dialogData.user))
    }
   
  }

  navigateCarousel(direction: number): void {
    const newIndex = this.currentCardIndex + direction;

    if (newIndex >= 0 && newIndex < this.userCards.length) {
      this.currentCardIndex = newIndex;
    }
  }

  setCurrentCard(index: number): void {
    if (index >= 0 && index < this.userCards.length) {
      this.currentCardIndex = index;
   
    }
  }

  getTransformStyle(): string {
    if (this.carouselDirection === 'vertical') {
      return `translateY(${-this.currentCardIndex * 100}%)`;
    } else {
      return `translateX(${-this.currentCardIndex * 100}%)`;
    }
  }

  isVertical(): boolean {
    return this.carouselDirection === 'vertical';
  }
  closeDialog(){
    this.dialogRef.close()
  }
  
  checkUserData(userDataValue:UserData) {
    const userData = userDataValue;
    const isProfileComplete = userData && userData.name && userData.matricula && userData.cpf && userData.birthDay;
    return !!isProfileComplete
  }
  checkDependentData(userDataValue:Dependent) {
    const userData = userDataValue;
    const isProfileComplete = userData && userData.name && userData.cpf && userData.birthDate;
    return !!isProfileComplete
  }
  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
