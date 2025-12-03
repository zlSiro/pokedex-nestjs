import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    // Extraemos los datos que necesitamos de la respuesta de la API
    data.results.forEach(({ name, url }) => {
      
      // Con split podemos dividir un string en varios segmentos (aca lo hacemos con el caracter '/')
      const segments = url.split('/');
      // El no del pokemon siempre esta en la penultima posicion
      // tiene que ser un numero, por eso usamos el operador '+' para convertir el string a number
      const no: number = +segments[ segments.length - 2];
      console.log({ name, no })
    })
    
    return data.results;
  }
}
