import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import AdminSeeder from './seeder/adminSeeder';

const config = require('config');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const adminSeeder = app.get(AdminSeeder);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  await app.listen(config.get('PORT'), () => {
    console.log(`   ⚡️ SERVER STATED ON PORT:${config.get('PORT')}`);
  });
  await adminSeeder.seedAdmin();
}
bootstrap();
