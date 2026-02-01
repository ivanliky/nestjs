import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]), // Registracija Report entiteta sa TypeOrmModule-om
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
