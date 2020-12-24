import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.page.html',
  styleUrls: ['./detalle-proveedor.page.scss'],
})
export class DetalleProveedorPage implements OnInit {
  contacto = false;
  detalle: any;
  idProveedor: string;
  nombre: string;
  ciudad: string;
  direccion: string;
  imagen: string;
  descripcion: string;
  email: string;
  telefono: string;
  calificacion: number;
  constructor(private servicSvc: ServiciosService,
              private activateRoute: ActivatedRoute,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.idProveedor = this.activateRoute.snapshot.paramMap.get('id');
    this.servicSvc.cargarDatosProveedor(this.idProveedor)
                  .subscribe(res => {
                    this.detalle = res;
                    this.nombre = this.detalle.nombre;
                    this.ciudad = this.detalle.ciudad;
                    this.direccion = this.detalle.direccion;
                    this.imagen = this.detalle.imagen;
                    this.descripcion = this.detalle.descripcion;
                    this.email = this.detalle.email;
                    this.telefono = this.detalle.telefono;
                    this.calificacion = this.detalle.calificacion;
                  });
  }

  activarDatos(){
    Swal.fire({
      title: 'estás seguro?',
      text: 'Recuerda que tu servicio será seguro y protegido solo si contratas por medio de TUTUM',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contacto = true;
        Swal.fire(
          'Ok',
          'Los datos de contacto del proveedor están habilitados.',
          'success'
        );
      }
    });
  }

  abrirSolicitud(){
    this.ctrlNav.navigateForward(`contrato/${this.idProveedor}`);
  }

}
