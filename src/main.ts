import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
// import { errorHandler } from './../utils/errorHandler'

// const config = require( 'config' )

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useStaticAssets({ root: join(__dirname, '..', 'public'), prefix: '/public/' });
  app.setViewEngine({ engine: { handlebars: require('handlebars') }, templates: join(__dirname, '..', 'views') });
  // app.use(errorHandler)

  await app.listen(3334, () => { console.log(`   ⚡️ SERVER STATED ON PORT:3334`) });
}
bootstrap();
