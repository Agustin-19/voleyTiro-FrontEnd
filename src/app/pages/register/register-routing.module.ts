import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component'

// => /register
const REGISTER_ROUTES: Routes = [
    { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(REGISTER_ROUTES)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
