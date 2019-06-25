import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClientServiceService } from '../servicios/client-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from "@angular/router";
import { DataClientService } from '../injectable/data-client.service';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clientes:Cliente[] = [];
  
  constructor(private clientServiceService: ClientServiceService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private data: DataClientService
              ) { }

  ngOnInit() {
    this.findAllClient();
  }

  /**
   * Trae los clientes para listarlos
   */
  public findAllClient(){
    this.spinner.show();
    this.clientServiceService.getClients().subscribe(
      data => {
        this.clientes = data;
        this.spinner.hide();
      }, 
      error => {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Parece que algo salio mal!',
        });
        this.spinner.hide();
      });
  }

  /**
   * Muestra todas las tarjetas de credito del cliente
   * @param id Numero de id del cliente
   */
  showCards(clientSelected:Cliente): void{
    ClientServiceService.clientSelected = clientSelected;
    this.router.navigate(['/list-cards']);
  }

  /**
   * Edita un cliente por ID
   * @param id 
   */
  editClient(id:number):void{
    var foundClient = this.clientes.find(function(client) {
      return client.clientId == id;
    });
    this.data.cliente = foundClient;
    this.data.isEdit = true;
    this.router.navigate(['/edit-client']);
  }

  deleteClient(id:number):void{
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
        this.clientServiceService.deleteClient(id).subscribe(
          data =>{
            Swal.fire(
              'Borrado!',
              'El registro hasido borrado.', 
              'success'
            );
            this.findAllClient();
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
}
