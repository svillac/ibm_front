import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../model/product';
import { ProductService } from '../servicios/product.service';
import { CardService } from '../servicios/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formProduct: FormGroup;
  processProduct : Product = new Product();

  constructor(public fb: FormBuilder,
              private productService: ProductService,
              private spinner: NgxSpinnerService,
              private router: Router) {
    this.formProduct = this.fb.group({
      description: ['', [Validators.required]],
      sellerDate: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.processProduct = ProductService.productSelected;
  }

  editProduct(){
    if(this.validateForm()){
      this.spinner.show();
      this.productService.editProduct(this.processProduct).subscribe(
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
    if(this.formProduct.get('description').hasError('required')
    || this.formProduct.get('sellerDate').hasError('required')
    || this.formProduct.get('amount').hasError('required')){
      bandera = false;
    }
    return bandera;
  }

}
