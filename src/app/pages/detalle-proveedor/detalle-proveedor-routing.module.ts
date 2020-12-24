import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleProveedorPage } from './detalle-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleProveedorPageRoutingModule {}
