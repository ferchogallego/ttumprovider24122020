import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  lista: any;
  constructor(private srvSvc: ServiciosService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.srvSvc.cargarCategorias()
    .subscribe(res => {
      this.lista = res;
    });
  }

  openCategory(categoria: string){
    this.ctrlNav.navigateForward(`proveedores/${categoria}`);
  }

}
