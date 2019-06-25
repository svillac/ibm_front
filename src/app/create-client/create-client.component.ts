import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClientServiceService } from '../servicios/client-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from "@angular/router"
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  proccessClient: Cliente = new Cliente();
  formClient: FormGroup;
  

  constructor(private clientServiceService: ClientServiceService,
              private spinner: NgxSpinnerService,
              private router: Router,
              public fb: FormBuilder) { 

                this.formClient = this.fb.group({
                  name: ['', [Validators.required, Validators.maxLength(50)]],
                  dir: ['', [Validators.required, Validators.maxLength(100)]],
                  city: ['', [Validators.required, Validators.maxLength(30)]],
                  tel: ['', [Validators.required, Validators.maxLength(20)]]
                });

              }

  ngOnInit() {
  }

  /**
   * Valida si el formulario tiene los datos correctamente
   * dligenciados
   */
  validateForm():boolean{
    var bandera:boolean = true;
    if(this.formClient.get('name').hasError('required')
    || this.formClient.get('tel').hasError('required')
    || this.formClient.get('dir').hasError('required')
    || this.formClient.get('city').hasError('required')){
      bandera = false;
    }
    return bandera;
  }

  /**
   * Creacion del cliente
   */
  addClient(){
    if(this.validateForm()){
      this.spinner.show();
      this.clientServiceService.addClient(this.proccessClient).subscribe(
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
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Parece que algo salio mal!',
          });
          this.spinner.hide();
        }
      );
    }

  }

}
