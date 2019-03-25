import { NgModule } from '@angular/core';
import { MenuController } from './menu.controller';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [MenuController],
    exports: [MenuController],
    imports: [CommonModule]
})
export class MenuModule { }