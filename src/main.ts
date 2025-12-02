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
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
