import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina las propiedades que no están definidas en el DTO (Data Transfer Object)
      forbidNonWhitelisted: true, // evita que se envíen propiedades que no están definidas en el DTO, generando un error 400
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build(); // configuración de la documentación de la API
  const document = SwaggerModule.createDocument(app, config); // crea la documentación de la API
  SwaggerModule.setup('docs', app, document); // ruta para acceder a la documentación

  app.enableCors(); // permite que todos los dominios puedan acceder a la API
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
