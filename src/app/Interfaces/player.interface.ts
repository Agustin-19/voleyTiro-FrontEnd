// player.model.ts

import { ICategory, MenuCategory } from "./categorie.interface";
import { IClub } from "./club.interface";

export interface IPlayer {
    _id?: string; // Si el modelo tiene un campo de identificación (usualmente _id en MongoDB)
    nombre: string;
    apellido: string;
    dni: string;
    direccion: Direccion[]; // Un array de direcciones
    genero?: string; // Puedes marcarlo como opcional si no es requerido
    fecha_nacimiento?: string; // Puedes marcarlo como opcional si no es requerido
    category: MenuCategory; // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    habilitado: boolean;
}

export interface Direccion {
    provincia: string;
    localidad: string;
    direccion: string;
}
