import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

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
      this.srvSvc.cargarTodasSolicitudes(this.idUser)
               .subscribe(res => {
                 this.lista = res;
                 this.cantidad = res.length;
                 if (this.cantidad === 0) {
                  Swal.fire(
                    'Sin solicitudes',
                    'Aún no cuentas con solicitudes',
                    'success'
                  );
                  this.ctrlNav.navigateBack(['/principal']);
                 }
               });
    });
  }

}
