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
      useFactory: (configService: ConfigService) => ({
        entities: [UserEntity],
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'user_db',
    //   port: 5432,
    //   username: 'economic-username',
    //   password: 'economic_password',
    //   database: 'economic_database',
    //   entities: [UserEntity],
    //   synchronize: true,
    // }),
  ],
  providers: [UserDoa, ModelMapperService],
  controllers: [],
  exports: [UserDoa, ModelMapperService],
})
export class DbUserModule {}
