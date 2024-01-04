import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelMapperService } from './service/modelMapper.service';
import { UserDoa } from './doa/user.doa';
import { UserEntity } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        entities: [UserEntity],
        type: 'postgres',
        database: config.getOrThrow('DB_NAME'),
        password: config.getOrThrow('DB_PASSWORD'),
        username: config.getOrThrow('DB_USER'),
        host: config.getOrThrow('DB_HOST'),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserDoa, ModelMapperService],
  controllers: [],
  exports: [UserDoa, ModelMapperService],
})
export class DbUserModule {}
