import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})
export class CotizacionesPage implements OnInit {
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
      this.srvSvc.cargarCotizaciones(this.idUser)
               .subscribe(res => {
                 this.lista = res;
                 this.cantidad = res.length;
                 if (this.cantidad === 0) {
                  Swal.fire(
                    'No enviaste cotizaciones',
                    'Aún no cuentas con cotizaciones enviadas',
                    'success'
                  );
                  this.ctrlNav.navigateBack(['/principal']);
                 }
               });
    });
  }
}
