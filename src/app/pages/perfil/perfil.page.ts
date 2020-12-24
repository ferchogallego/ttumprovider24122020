import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilUser: any;
  idUser: string;
  dataUser: any;
  nombre: string;
  imagen: string;
  ciudad: string;
  descripcion: string;
  email: string;
  telefono: string;
  categoria: string;
  public user = this.authSvc.afAuth.user;
  constructor(private srvSvc: ServiciosService,
              private ctrlNav: NavController,
              private authSvc: AuthService ) { }

  ngOnInit() {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.authSvc.userDataConsult(this.idUser)
                  .subscribe(res => {
                    this.dataUser = res;
                    this.nombre = this.dataUser.name;
                    this.imagen = this.dataUser.imagen;
                    this.ciudad = this.dataUser.city;
                    this.descripcion = this.dataUser.descripcion;
                    this.email = this.dataUser.email;
                    this.telefono = this.dataUser.phone;
                    this.categoria = this.dataUser.categoria;
                  });
    });
  }

}
