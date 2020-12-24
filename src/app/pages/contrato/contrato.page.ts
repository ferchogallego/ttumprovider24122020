import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
})
export class ContratoPage implements OnInit {
  idProveedor: string;
  public user = this.authSvc.afAuth.user;
  perfilUser: any;
  idUser: string;
  idSolicitud: string;
  sendQuote = new FormGroup ({
    tarifa: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    revision: new FormControl('', Validators.required),
    garantia: new FormControl('', Validators.required),
    proveedor: new FormControl(''),
    cliente: new FormControl(''),
    estado: new FormControl('Cotizado'),
    fecha: new FormControl(new Date().getTime())
  });
  get tarifaNoValido() {
    return this.sendQuote.get('tarifa').invalid && this.sendQuote.get('tarifa').touched;
  }
  get descripcionNoValido() {
    return this.sendQuote.get('descripcion').invalid && this.sendQuote.get('descripcion').touched;
  }
  get revisionNoValido() {
    return this.sendQuote.get('revision').invalid && this.sendQuote.get('revision').touched;
  }
  get garantiaNoValido() {
    return this.sendQuote.get('garantia').invalid && this.sendQuote.get('garantia').touched;
  }
  constructor(private servicSvc: ServiciosService,
              private activateRoute: ActivatedRoute,
              private ctrlNav: NavController,
              private authSvc: AuthService) { }

  ngOnInit() {
    this.idSolicitud = this.servicSvc.idCotizacion;
    this.idUser = this.activateRoute.snapshot.paramMap.get('id');
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idProveedor = this.perfilUser.uid;
    });
  }

  loadQuote(cotizacion: any){
    cotizacion.proveedor = this.idProveedor;
    cotizacion.cliente = this.idUser;
    Swal.fire({
      title: 'Está seguro?',
      text: 'Se enviará la cotizacion',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicSvc.enviarCotizacion(cotizacion).then(() => {
        this.servicSvc.actualizarEstadoSolicitud(this.idSolicitud);
        this.ctrlNav.navigateBack('/principal');
        Swal.fire(
            'Enviada!',
            'La cotización fué enviada exitosamente.',
            'success'
          );
        });
      }
    });
}

}
