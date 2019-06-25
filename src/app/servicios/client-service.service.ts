import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { AppConstant } from '../util/AppConstant';



@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  public static clientSelected:Cliente;

  baseUrl:string = AppConstant.URL_BASE;

  constructor(private http: HttpClient) { }

  getClients(){
    return this.http.get<Cliente[]>(this.baseUrl + 'getAllClient');
  }

  addClient(cliente: Cliente){
    return this.http.post<Cliente>(this.baseUrl + 'addClient', cliente);
  }

  deleteClient(id: number){
    return this.http.get<boolean>(this.baseUrl + 'deleteClient/?id=' + id);
  }

  editClient(cliente: Cliente){
    return this.http.post<boolean>(this.baseUrl + 'editClient', cliente);
  }
}
