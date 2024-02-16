// game.model.ts

import { ICategory, MenuCategory } from "./categorie.interface";
import { IClub } from "./club.interface";

export interface IGame {
    fecha: string; // Puedes marcarlo como opcional si no es requerido
    category: MenuCategory; // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    club_loc: IClub; // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    sets_won_loc: number;
    result_loc: number[]; // Array de números (puedes marcarlo como opcional)
    club_vis: IClub; // Debería ser del tipo correcto (por ejemplo, mongoose.Schema.Types.ObjectId)
    set_won_vis: number;
    result_vis: number[]; // Array de números (puedes marcarlo como opcional)
    resultado: string;
}
