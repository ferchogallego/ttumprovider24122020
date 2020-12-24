import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  lista: any;
  urlImage: string;
  imageSrc: any;
  secondPart = false;
  uploadPercent: Observable<number>;
  porcentaje = 0;
  registerPerson = new FormGroup ({
    name: new FormControl('', Validators.required),
    country: new FormControl('Colombia'),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    registrado: new FormControl(new Date().getTime()),
    rol: new FormControl('Proveedor'),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  get nameNoValido() {
    return this.registerPerson.get('name').invalid && this.registerPerson.get('name').touched;
  }
  get cityNoValido() {
    return this.registerPerson.get('city').invalid && this.registerPerson.get('city').touched;
  }
  get emailNoValido() {
    return this.registerPerson.get('email').invalid && this.registerPerson.get('email').touched;
  }
  get phoneNoValido() {
    return this.registerPerson.get('phone').invalid && this.registerPerson.get('phone').touched;
  }
  get passwordNoValido() {
    return this.registerPerson.get('password').invalid && this.registerPerson.get('password').touched;
  }
  get categoriaNoValido() {
    return this.registerPerson.get('categoria').invalid && this.registerPerson.get('categoria').touched;
  }
  get descripcionNoValido() {
    return this.registerPerson.get('descripcion').invalid && this.registerPerson.get('descripcion').touched;
  }

  constructor(private authSvc: AuthService,
              private router: Router,
              private srvSvc: ServiciosService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.srvSvc.cargarCategorias()
    .subscribe(res => {
      this.lista = res;
    });
  }

  onRegisterPerson(datos: any){
    datos.imagen = this.urlImage;
    if (this.registerPerson.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.registerPerson.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, password } = this.registerPerson.value;
    try {
      const user = this.authSvc.register(email, password);
      if (user) {
        user.then(userData => {
         const id = userData.user.uid;
         datos.uid = id;
         this.authSvc.dataProvider(id, datos);
         Swal.fire({
           title: 'Proveedor: ' + datos.name,
           text: 'Registrado satisfactoriamente',
           icon: 'success',
           showCloseButton: true,
         });
         this.router.navigate(['/login']);
       });
   }
    } catch (error) {
      Swal.fire({
        title: 'Algo salió mal',
        text: error,
        icon: 'error',
        showCloseButton: true,
      });
    }
  }

  activarSecondPart(){
    this.secondPart = true;
  }

  cancelRegister(){
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Se va a salir del registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home']);
        this.secondPart = false;
      }
    });
  }

  handleImage(event){
    const idImg = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `perfil/proveedor_${idImg}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    console.log(this.uploadPercent);
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe( urlImg => {
        this.urlImage = urlImg;
      });
    })).subscribe();
  }



}
