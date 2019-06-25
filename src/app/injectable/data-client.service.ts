import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class DataClientService {
  public cliente: Cliente;
  public isEdit:boolean;
  constructor() { }
}
