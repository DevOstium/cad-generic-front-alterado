import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteFormController } from './cliente-form/cliente-from.controller';
import { ClienteRoutingModule } from './cliente-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteListController } from './cliente-list/cliente-list.controller';
import { MenuModule } from 'src/app/core/menu/menu.module';


@NgModule({
  declarations: [
        ClienteFormController,
        ClienteListController
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClienteRoutingModule,
    MenuModule
  ],
  exports:[
  ],
 providers: [
 
  ]
})
export class ClienteModulo { }
