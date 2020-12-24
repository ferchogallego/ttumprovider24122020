import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  perfilUser: any;
  idUser: string;
  dataUser: any;
  nombre: string;
  imagen: string;
  cotizaciones: number;
  historial: number;
  public user = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,
              private srvSvc: ServiciosService) { }

  ngOnInit() {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.authSvc.userDataConsult(this.idUser)
                  .subscribe(res => {
                    this.dataUser = res;
                    this.nombre = this.dataUser.name;
                    this.imagen = this.dataUser.imagen;
                  });
      this.srvSvc.cargarCotizaciones(this.idUser)
      .subscribe(res => {
        this.cotizaciones = res.length;
      });

      this.srvSvc.cargarTodasSolicitudes(this.idUser)
      .subscribe(res => {
        this.historial = res.length;
      });
    });
}

}
