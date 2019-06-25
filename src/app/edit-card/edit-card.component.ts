import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CardService } from '../servicios/card.service';
import { Card } from '../model/cards';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  processCard: Card = new Card();
  formCard: FormGroup;

  constructor(public fb: FormBuilder,
              public cardService: CardService,
              private spinner: NgxSpinnerService,
              private router: Router) { 
                this.formCard = this.fb.group({
                  numberCard: ['', [Validators.required, Validators.maxLength(50)]],
                  csv: ['', [Validators.required, Validators.maxLength(100)]],
                  cardType: ['', [Validators.required, Validators.maxLength(20)]]
                });
  }

  ngOnInit() {
    this.processCard = CardService.cardSelected;
  }

  addCard(){
    if(this.validateForm()){
      this.spinner.show();
      this.cardService.editCard(this.processCard).subscribe(
        data => {
          this.spinner.hide(); 
          Swal.fire({
            type: 'success',
            title: 'Tarjeta ha sido editada correctamente',
            showConfirmButton: false,
            timer: 3500
          });
          this.router.navigate(['list-client/']);
        },
        error => {
          this.spinner.hide(); 
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Parece que algo salio mal!',
          });        
        }
      );
    }
  }

  /**
   * Valida si el formulario tiene los datos correctamente
   * dligenciados
   */
  validateForm():boolean{
    var bandera:boolean = true;
    if(this.formCard.get('numberCard').hasError('required')
    || this.formCard.get('csv').hasError('required')
    || this.formCard.get('cardType').hasError('required')){
      bandera = false;
    }
    return bandera;
  }

}
