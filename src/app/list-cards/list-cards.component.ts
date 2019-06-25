import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Card } from '../model/cards';
import { Cliente } from '../model/cliente';
import { ClientServiceService } from '../servicios/client-service.service';
import { CardService } from '../servicios/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {

  client:Cliente;
  cards:Card[];

  constructor(private router: Router,
              private cardService: CardService) { }

  ngOnInit() {
    this.client = ClientServiceService.clientSelected;
    if(this.client == undefined){
      this.router.navigate(['list-client']);
    }
  } 

  showHistory(selectedCard : Card){
    CardService.cardSelected = selectedCard;
    this.router.navigate(['/list-products']);
  }

  deleteCard(card : Card){
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: "No podras revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => { 
      if (result.value) {
        this.cardService.deleteCard(card.cardId).subscribe(
          data =>{
            Swal.fire(
              'Borrado!',
              'El registro hasido borrado.', 
              'success'
            );
            this.router.navigate(['/list-client']);
          },

          error => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Parece que algo salio mal!',
            });
          }
        );
      }
    })
  }

  editCard(editCard : Card){
    CardService.cardSelected = editCard;
    this.router.navigate(['/edit-cards']);
  }

}
