import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/v1/user/user.module';
import { CountryModule } from './api/v1/country/country.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.ynx7m2f.mongodb.net/?retryWrites=true&w=majority`),
    UserModule,
    CountryModule,
    AuthModule
  ],
})
export class AppModule {}
