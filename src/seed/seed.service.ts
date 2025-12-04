import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    // Inyectamos el modelo de Pokémon para poder crear registros en la base de datos
    // Para eso tenemos que importar el módulo de Pokémon en el SeedModule
    @InjectModel( Pokemon.name ) // Inyecta el MODELO de Mongoose, no el PokemonService
    private readonly pokemonModel: Model<Pokemon>,

    // Agregamos el adaptador de axios (Common module)
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {

    /**
     *  HAY VARIAS FORMAS DE HACER ESTO, ESTA ES UNA DE ELLAS.     

    // Cada vez que ejecutamos este metodo, limpiamos la colección de pokemones
    await this.pokemonModel.deleteMany({}); // DELETE * FROM pokemons en SQL

    // Hacemos la petición HTTP a la PokeAPI
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    // Creamos un arreglo de promesas para crear los pokemones en la base de datos
    const insertPromisesArray: Promise<any>[] = [];

    // Extraemos los datos que necesitamos de la respuesta de la API
    data.results.forEach(({ name, url }) => {
      
      // Con split podemos dividir un string en varios segmentos (aca lo hacemos con el caracter '/')
      const segments = url.split('/');

      // El no del pokemon siempre esta en la penultima posicion
      // tiene que ser un numero, por eso usamos el operador '+' para convertir el string a number
      const no: number = +segments[ segments.length - 2];

      // También usas this.pokemonModel.create() - método de Mongoose
      // const pokemon = await this.pokemonModel.create({ name, no });

      insertPromisesArray.push(
        this.pokemonModel.create({ name, no })
      );
    })
    await Promise.all(insertPromisesArray);
    */
    /**
     * FORMA MAS EFICIENTE DE HACER EL SEE USANDO insertMany
     */
    
    await this.pokemonModel.deleteMany({}); // DELETE * FROM pokemons en SQL
    
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert: { name: string, no: number }[] = [];
    
    data.results.forEach( ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2];

      pokemonToInsert.push({ name, no });
    });
    // Insertamos todos los pokemones de una sola vez en la base de datos
    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed executed successfully';
  }
}
