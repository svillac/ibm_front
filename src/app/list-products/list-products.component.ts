import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../servicios/client-service.service';
import { Cliente } from '../model/cliente';
import { Router } from "@angular/router";
import { Card } from '../model/cards';
import { CardService } from '../servicios/card.service';
import { Product } from '../model/product';
import Swal from 'sweetalert2';
import { ProductService } from '../servicios/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  client : Cliente;
  card : Card;
  
  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.client = ClientServiceService.clientSelected;
    this.card = CardService.cardSelected;
    if(this.client == undefined || this.card == undefined){
      this.router.navigate(['list-client']);
    }
  }

  deletePoduct(product: Product){
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
        this.productService.deleteProduct(product.productId).subscribe(
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

  editProduct(product: Product){
    ProductService.productSelected = product;
    this.router.navigate(['/edit-product']);
  }

}
