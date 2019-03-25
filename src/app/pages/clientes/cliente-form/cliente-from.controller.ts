import { Component,  Injector } from '@angular/core';
import { Cliente } from '../domain/cliente.model';
import { BaseResourceForm } from 'src/app/shared/form/base-resource.form';
import { ClienteService } from '../services/cliente.service';

@Component({
        templateUrl : "./cliente-form.view.html"
})
export class ClienteFormController extends BaseResourceForm<Cliente> {
        
        constructor ( protected  clienteService :  ClienteService,
                      protected        injector : Injector
                    ) {
          super(injector, new Cliente(), clienteService, Cliente.fromJson );        
        } 
            
        protected buildResourceForm() {
                this.resourceForm = this.formBuilder.group( { id: [null], nome: [''] } )
        }
       
        protected creationPageTitle(): string {
                return "Cadastro de Novo Cliente";
        }
        
        protected editionPageTitle(): string {
                const nomeCliente = this.resource.nome || "";
        
              return "Editando Cliente: " + nomeCliente;
        }
      
    }