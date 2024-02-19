import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHour } from 'src/app/Interfaces/hour.interface';
import Swal from 'sweetalert2';
import { ICategory, MenuCategory } from '../../../Interfaces/categorie.interface';
import { NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { HourService } from 'src/app/services/hour.service';
import { Select, initTE } from "tw-elements";

@Component({
  selector: 'app-timeteble-admin',
  templateUrl: './timeteble-admin.component.html',
  styles: [
  ]
})
export class TimetebleAdminComponent implements OnInit {

  public seleccionados!: any;
  public selecGen!: 'Masculino';
  public category!: MenuCategory[];
  nada: ICategory = {
    status: 0,
    menu_categories: [],
  }

  public hour: IHour ={
    category: this.seleccionados,           //Un array, porque en principio las categorias van a ser hardcodeadas
    hora: '',
    profesor: '',
    dias: []
  }

  public dias: [] = [];

  constructor(
    private _categorie: CategorieService,
    private _hour: HourService,
    private router: Router
  ) { }

  ngOnInit(): void {
    initTE({ Select });
  }

  cargarCategoria(genero: any){
    let gen = genero
    // console.log(this.selecGen);
     // Obtén una referencia al elemento select
    const selectCat = document.getElementById('selectCat') as HTMLSelectElement;

     // Habilita el select una vez que los datos estén listos (por ejemplo, después de una operación asincrónica)
    selectCat.removeAttribute('disabled');
    
    this._categorie.traerCategoria().subscribe((resp: any) => {
      this.nada = resp  

      this.category = this.nada.menu_categories.filter(cat =>{
        return cat.genero == gen;
      })
      // console.log(this.category, gen);
    })
  }

  elegirDias(dia: any) {
    this.dias = dia;
    console.log(this.dias);    
  }


  enviarFormulario(formulario: NgForm) {

    Swal.fire({
      title: 'Registrando Club',
      text: 'Enviando información...',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    })

    if (formulario.invalid) {
      Swal.fire({
        icon: 'warning',
        title: '¡Alerta!',
        text: 'Debe completar los datos requeridos para continuar',
        confirmButtonText: 'Aceptar'
      });
      return
    };
    this.hour.category = this.seleccionados
    this.hour.dias = this.dias
    this.registrarHorario(this.hour)
  }

  registrarHorario(hour: any) {
    console.log(hour);
    
    this._hour.createHour(hour).subscribe(res => {
      Swal.fire({
        title: 'Correcto',
        text: 'Club registrado correctamente',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Hecho',
        confirmButtonColor: '#3085d6'
      }).then(result => {
        if (result.value) {
          // this.router.navigateByUrl('/home');
        }
      });
    }, error => {
      console.log(error);

    })
  }


}
