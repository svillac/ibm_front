import { Injectable } from '@angular/core';
import { AppConstant } from '../util/AppConstant';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public static cardSelected: Card;
  baseUrl:string = AppConstant.URL_BASE;
  
  constructor(private http: HttpClient) { }

  addCard(card: Card, clientId: number){
    return this.http.post<Card>(this.baseUrl + 'addCard/' + clientId, card);
  }

  editCard(card: Card){
    return this.http.put<Boolean>(this.baseUrl + 'editCard/', card);
  }

  deleteCard(cardId: number){
    return this.http.delete<boolean>(this.baseUrl + 'deleteCard/' + cardId);
  }

}
