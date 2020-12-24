import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  activatePass = false;
  usuario: any;
  tipo: any;
  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get emailNoValido() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  constructor(private authSvc: AuthService,
              private ctrlNav: NavController) { }

  ngOnInit() {
  }

  onLogin(){
    if (this.loginForm.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.loginForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, password } = this.loginForm.value;
    try {
      const user = this.authSvc.login(email, password);
      if (user) {
        user.then(result => {
          this.usuario = result.user.uid;
          this.authSvc.userDataConsult(this.usuario)
                      .subscribe(resp => {
                        this.tipo = resp;
                        if (this.tipo) {
                          if (this.tipo.rol === 'Proveedor') {
                            this.ctrlNav.navigateForward('/principal');
                          }
                        } else {
                          Swal.fire({
                            title: 'Error...',
                            text: 'Usuario no registrado en tutum proveedores',
                            icon: 'error',
                            allowOutsideClick: false,
                            showCloseButton: true
                          });
                        }
                      });
        }).catch(err => {
          Swal.fire({
            title: 'Error...',
            text: 'Email o contraseña inválidos',
            icon: 'error',
            allowOutsideClick: false,
            showCloseButton: true
          });
        });
      }
    } catch (error) {
    }
  }

  togglePasswordModeTrue(){
    this.activatePass = true;
  }
  togglePasswordModeFalse(){
    this.activatePass = false;
  }

}
