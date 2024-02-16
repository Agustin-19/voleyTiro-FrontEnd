// club.model.ts

import { ICategory, MenuCategory } from "./categorie.interface";
import { IPlayer } from "./player.interface";

export interface IClub {
    _id?: string; // Si el modelo tiene un campo de identificación (usualmente _id en MongoDB)
    nombre: string;
    sede: Direccion[];
    categorias: MenuCategory[]; // Array de cualquier tipo (debería ser del tipo correcto)
    colores: []; // Array de cadenas (puedes marcarlo como opcional)
    jugadores?: IPlayer[]; // Array de cualquier tipo (puedes marcarlo como opcional)    
    perfil_imagen_url?: string | null;
    perfil_imagen_nombreArchivo?: string;

}
export interface Direccion{
    provincia: string,
    localidad: string,
    direccion: string,
}
