export interface Localidad {
    cantidad:    number;
    inicio:      number;
    localidades: Localidade[];
    parametros:  Parametros;
    total:       number;
}

export interface Localidade {
    categoria:               string;
    centroide_lat:           number;
    centroide_lon:           number;
    departamento_id:         string;
    departamento_nombre:     string;
    id:                      string;
    localidad_censal_id:     string;
    localidad_censal_nombre: string;
    municipio_id:            string;
    municipio_nombre:        string;
    nombre:                  string;
    provincia_id:            string;
    provincia_nombre:        string;
}

export interface Parametros {
    aplanar:          boolean;
    campos:           string[];
    departamento:     string;
    exacto:           boolean;
    localidad_censal: string;
    max:              number;
    municipio:        string;
    nombre:           string;
    orden:            string;
    provincia:        string;
}
