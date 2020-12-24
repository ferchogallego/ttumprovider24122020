import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  categoria: string;
  proveedores: any;
  constructor(private activateRoute: ActivatedRoute,
              private servSvc: ServiciosService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.categoria = this.activateRoute.snapshot.paramMap.get('id');
    this.servSvc.cargarProveedoresPorCategoria(this.categoria)
                .subscribe(res => {
                  this.proveedores = res;
                });
  }

  detalleProveedor(idProveedor: string){
    this.ctrlNav.navigateForward(`detalle-proveedor/${idProveedor}`);
  }

}
