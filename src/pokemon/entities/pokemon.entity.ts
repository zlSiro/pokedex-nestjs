import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"; // Importamos Document de mongoose para definir la entidad

// Decorador para definir un esquema de Mongoose
// Mongo se encargara de crear la coleccion en plural 'pokemons'
@Schema()
export class Pokemon extends Document { 
  
  // id: string; // Mongo ya lo da de forma automática
  
  @Prop({ unique: true, index: true }) // Decorador para definir una propiedad del esquema
  name: string;

  @Prop({ unique: true, index: true })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
