import { join } from 'path'; // Viene de Node.js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  // Modulo de contenido estatico. Sirve para servir archivos estaticos como imagenes, html, css, js, etc.
  imports: [
    
    // Configuracion del modulo de contenido estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Conexion a la base de datos MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    
    // Modulos de la aplicacion
    PokemonModule,
    
    CommonModule,
  ],
})
export class AppModule {}
