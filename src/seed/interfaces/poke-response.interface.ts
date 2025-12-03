// Con la extension Paste Json as Code podemos crear esta interfaz
// Esta es la respuesta que obtenemos de la pokeapi
// la extension crea las interfaces automaticamente solamente con pegar el json de la respuesta

export interface PokeResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}
