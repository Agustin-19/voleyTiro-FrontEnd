// categories.model.ts
export interface ICategory {
    status:          number;
    menu_categories: MenuCategory[];
}

export interface MenuCategory {
    _id:    string;
    genero: Genero;
    parent: string;
    color:  Color;
}

export enum Color {
    Ddeeff = "#DDEEFF",
    Ffaa99 = "#FFAA99",
    Ffeedd = "#FFEEDD",
}

export enum Genero {
    Femenino = "Femenino",
    Masculino = "Masculino",
    Mixto = "Mixto",
}
