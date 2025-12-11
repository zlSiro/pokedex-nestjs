import { join } from 'path'; // Viene de Node.js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';

@Module({
  // Modulo de contenido estatico. Sirve para servir archivos estaticos como imagenes, html, css, js, etc.
  imports: [
    
    // Configuracion de variables de entorno
    // Lee el archivo .env y carga las variables de entorno en process.env
    // Tiene que ser el primer modulo en importarse para que las demas configuraciones puedan usar las variables de entorno
    ConfigModule.forRoot({
      load: [ EnvConfiguration ] // Carga la configuracion de variables de entorno
    }),
    
    // Configuracion del modulo de contenido estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Conexion a la base de datos MongoDB
    MongooseModule.forRoot(process.env.MONGODB!),
    
    // Modulos de la aplicacion
    PokemonModule,
    CommonModule,    
    SeedModule,
  ],
})
export class AppModule {
  
  // como es una clase de TypeScript, podemos usar el constructor para hacer cosas al inicializar la aplicacion

  /* constructor() {
    console.log( process.env );
  } */
}
