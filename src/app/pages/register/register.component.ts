import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  usuario: IUser = {
    username: '',
    userlastname: '',
    email: '',
    password: '',
    passwordconf: '',
    google_uid: '',
    roles:[],
  };

constructor(
  private _auth: AuthService, 
  private router: Router,
) { }

onSubmit(formulario: NgForm){
  // al enviar el formulario mustra una alerta que se ejecuta mientras se estan procesando los datos
  // console.log('aca llego');
  
  Swal.fire({
    title: 'Registrar Usuario',
    text: 'Enviando información...',
    icon: 'info',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false
  })
  // si el formulario no tiene los datos requeridos no envia
  if(formulario.invalid)
  { 
    // console.log('no valido');
    return;
  }
    // console.log('formulario valido');
    
    // verifica si la contraseña y su confirmacion sean iguales, en caso de no serlo se envia una alerta notificando la situacion y se vuelve al formulario
    if(this.usuario.password !== this.usuario.passwordconf){
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: 'Aceptar'
    }) 
    return;
  }    
  this.usuario.roles = ['usuario'],
  this.usuario.google_uid = '1',
  this.registrarUsuario(this.usuario);
  
}



// funcion que llama al servicio de autenticacion y registra un usuario
registrarUsuario(usuario : any) {
  this._auth.registerUser(usuario).subscribe( response => {
    Swal.fire({
      title: 'Correcto',
      text: 'Usuario registrado correctamente',
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonText: 'Iniciar sesión',
      confirmButtonColor: '#3085d6'
    }).then( result => {
      if(result.value){
        this.router.navigateByUrl('/login');
      }
    });
  },error =>{
    console.log(error);
    
  })
}
}
