import { ICategory, MenuCategory } from "./categorie.interface";

export interface IHour {
    _id?: string;
    category: MenuCategory;
    profesor: string;
    hora: string;
    dias: [];
}