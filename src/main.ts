import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix para todas las rutas a 'api/v2'
  app.setGlobalPrefix('api/v2');

  // Configuracion global de Pipes de validacion
  // Sin esto no se validan los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Esto permite transformar los payloads a los tipos de los DTOs. Payload significa los datos que vienen en el body de la request
      transformOptions: {
        enableImplicitConversion: true, // Esto permite la conversion implicita de tipos (ejemplo string a number)
      }
    })
  )

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Servidor corriendo en el puerto ${port}`);
  
}
bootstrap();
