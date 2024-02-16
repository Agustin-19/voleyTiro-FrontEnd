export interface IPublicity {
    _id?: string; // ID opcional, ya que MongoDB generará uno automáticamente
    titulo: string;
    img_url: string;
    img_nombre?: string;
}