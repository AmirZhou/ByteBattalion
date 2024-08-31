import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // The following cookie-session and global pipes has been moved to the app.module.ts for e2e testing
  
  // app.use(cookieSession({
  //   keys: ['amirkey']
  // }))

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: false,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
