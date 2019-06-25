import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CardService } from '../servicios/card.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from '../model/cards';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { ClientServiceService } from '../servicios/client-service.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  formCard: FormGroup;
  processCard: Card = new Card()

  constructor(public fb: FormBuilder,
              public cardService: CardService,
              private spinner: NgxSpinnerService,
              private router : Router) { 
    this.formCard = this.fb.group({
      numberCard: ['', [Validators.required, Validators.maxLength(50)]],
      csv: ['', [Validators.required, Validators.maxLength(100)]],
      cardType: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
  }

  public addCard(){
    if(this.validateForm()){
      this.spinner.show();
      this.cardService.addCard(this.processCard, ClientServiceService.clientSelected.clientId).subscribe(
        data => {
          this.spinner.hide();
          Swal.fire({
            type: 'success',
            title: 'Cliente ha sido guardado correctamente',
            showConfirmButton: false,
            timer: 3500
          });
          this.router.navigate(['/list-client'])
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
