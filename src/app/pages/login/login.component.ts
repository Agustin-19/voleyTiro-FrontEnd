import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalletitaService } from 'src/app/services/galletita.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  name:string = '';
  password:string = '';
  private loginAttempts = 0;
  private maxLoginAttempts = 3;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private _user: UserService,
    private _galletita: GalletitaService,
  ) { }


  onSubmit(formulario: NgForm){

    Swal.fire({
      title: 'Iniciar sesión',
      text: 'Enviando información...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    });

    if (formulario.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Debe completar todos los campos',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar'
      });
    };
    this._auth.loginUser(this.name, this.password).then(resp =>{
      // if (resp.user?.emailVerified == true) {
        this._user.getUserById(resp.user?.uid).subscribe( datosUser =>{
          this._galletita.setCookie('_lg',datosUser);
          Swal.close();
          this.router.navigate(['home/'])
        })
      // } else {
        // Swal.close();
        // this.router.navigate(['login/verify-mail']);
      // }
    }).catch((error: FirebaseError)=>{
      if (error.code === "auth/wrong-password") {
        this.loginAttempts++;
        if (this.loginAttempts >= this.maxLoginAttempts) {
          this.showForgotPasswordOption();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El correo y/o la contraseña no son válidos',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar'
          });
        }
      } else {
        // Otro tipo de error
        console.error("Ocurrió un error durante el inicio de sesión:", error);
      }

    });
  }
  showForgotPasswordOption() {
    Swal.fire({
      title: '¿Olvidaste la contraseña?',
      text: '¿Deseas restablecer tu contraseña?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restablecer contraseña',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // redirigir a la pagina para recuperar contraseña
        // this.router.navigate(['/login/forgot-password']);
      }
    });
  }

}
