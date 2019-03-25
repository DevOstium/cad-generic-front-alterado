import { Component } from '@angular/core';
import { Cliente } from '../domain/cliente.model';
import { BaseResourceList } from 'src/app/shared/list/base-resource.list';
import { ClienteService } from '../services/cliente.service';


@Component({
    selector    : 'app-cliente-list',
    templateUrl : './cliente-list.view.html'
  })
export class ClienteListController extends BaseResourceList<Cliente> {
  
    constructor(private clienteService: ClienteService) { 
      super(clienteService);
    }
}