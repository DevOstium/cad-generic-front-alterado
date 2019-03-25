import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/service/base-resource.service';
import { Cliente } from '../domain/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService extends BaseResourceService<Cliente> {

     constructor( protected injector: Injector) {
          super("clientes", injector, Cliente.fromJson);
     }
}

