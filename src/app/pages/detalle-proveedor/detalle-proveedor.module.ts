import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProveedorPageRoutingModule } from './detalle-proveedor-routing.module';

import { DetalleProveedorPage } from './detalle-proveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProveedorPageRoutingModule
  ],
  declarations: [DetalleProveedorPage]
})
export class DetalleProveedorPageModule {}
