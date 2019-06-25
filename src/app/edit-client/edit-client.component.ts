import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataClientService } from '../injectable/data-client.service';
import { ClientServiceService } from '../servicios/client-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  proccessClient: Cliente = new Cliente();
  formClient: FormGroup;

  constructor(public fb: FormBuilder,
              private data: DataClientService,
              private clientService: ClientServiceService,
              private spinner: NgxSpinnerService,
              private router: Router) { 
    this.formClient = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      dir: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      tel: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.proccessClient = this.data.cliente;
  }
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
   * Validacion del formulario 
   */
  editClient(){
    this.spinner.show();
    if(this.validateForm()){
      this.clientService.editClient(this.proccessClient).subscribe(
        success => {
          this.spinner.hide();
          Swal.fire({
            type: 'success',
            title: 'Cliente ha sido guardado correctamente',
            showConfirmButton: false,
            timer: 3500
          });
          this.router.navigate(['/list-client']);
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

}
