import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiciosService } from '../../services/servicios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  perfilUser: any;
  idUser: string;
  lista: any;
  cantidad: number;
  public user = this.authSvc.afAuth.user;
  constructor(private srvSvc: ServiciosService,
              private ctrlNav: NavController,
              private authSvc: AuthService ) { }

  ngOnInit() {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.srvSvc.cargarSolicitudes(this.idUser)
               .subscribe(res => {
                 this.lista = res;
                 this.cantidad = res.length;
               });
    });
  }

  openCategory(categoria: string){
    console.log(categoria);
    this.ctrlNav.navigateForward(`proveedores/${categoria}`);
  }

  cotizar(solicitud: any){
    this.srvSvc.idCotizacion = solicitud.id;
    this.ctrlNav.navigateForward(`contrato/${solicitud.cliente}`);
  }

}
