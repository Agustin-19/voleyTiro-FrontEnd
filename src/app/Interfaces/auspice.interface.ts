export interface IAuspice {
    _id?: string | null; // ID opcional, ya que MongoDB generará uno automáticamente
    titulo?: string | null;
    img_url?: string | null;
}