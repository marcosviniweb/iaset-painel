import { Component, input, OnInit } from '@angular/core';
import { CardData } from '../../core/models/cardData.model';
import { CommonModule } from '@angular/common';

import { CpfMaskPipe } from '../../shared/pipes/cpf-mask.pipe';
import { ApiUrl } from '../../core/env/apiUrl';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, CpfMaskPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  cardData = input<CardData>()
  cardDataUser!:CardData  
  
  
  
  protected apiUrlImg = ApiUrl.urlFile
  
  ngOnInit(): void {

    this.setCardData()
  }

  setCardData(){
    this.cardDataUser = this.cardData() as CardData
  }
}
