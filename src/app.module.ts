import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    // ConfigModule.forRoot() es un decorador que permite cargar variables de entorno y configuraciones de la aplicación en un módulo de NestJS.
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // carga las variables de entorno según el entorno de la aplicación
      load: [config], // carga las variables de entorno definidas en el archivo config.ts
      isGlobal: true, // permite que las variables de entorno estén disponibles en toda la aplicación
      validationSchema: Joi.object({ // valida las variables de entorno con Joi
        API_KEY: Joi.number().required(), // valida que la variable de entorno API_KEY sea un número y sea requerida
        DATABASE_NAME: Joi.string().required(), // valida que la variable de entorno DATABASE_NAME sea un string y sea requerida
        DATABASE_PORT: Joi.number().required(), // valida que la variable de entorno DATABASE_PORT sea un número y sea requerida
      }),
    }),
    HttpModule, // importa el módulo HttpModule para realizar peticiones HTTP

    UsersModule, // importa el módulo UsersModule para utilizarlo en la aplicación
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS', // define el nombre del proveedor de la petición HTTP
      // useFactory es un método que permite realizar una petición HTTP y retornar los datos de la petición como un proveedor de la aplicación.
      useFactory: async (http: HttpService) => { // recibe como argumento el servicio HttpService
        const tasks = await http // realiza una petición HTTP a la URL https://jsonplaceholder.typicode.com/todos
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data; // retorna los datos de la petición HTTP
      },
      inject: [HttpService], // inyecta el servicio HttpService en el proveedor de la petición HTTP para realizar la petición HTTP en la aplicación de NestJS
    },
  ],
})
export class AppModule {}
