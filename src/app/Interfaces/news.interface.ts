export interface INews {
    _id?: string; // ID opcional, ya que MongoDB generará uno automáticamente
    titulo: string;
    contenido: string;
    img_url?: string | null;
    banner_url?: string |null;
    fechaPublicacion: string ; // Fecha de publicación opcional, se generará automáticamente si no se proporciona
}  