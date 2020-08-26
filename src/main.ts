import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validation.pipe';
import { HttpExceptionFiler } from './filters/http-exception.filter';
import { XMLMiddleware } from './middleware/xml.middleware';
import { AuthGuard } from './guard/auth.guard';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFiler());

  app.use(new XMLMiddleware().use);

  app.useGlobalGuards(new AuthGuard());

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3001);

}
bootstrap();
