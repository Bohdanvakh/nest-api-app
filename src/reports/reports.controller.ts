import { Controller, Post, Body } from '@nestjs/common';
import { creareReportDto } from './dtos/creare-report.dto';

@Controller('reports')
export class ReportsController {
    @Post()
    createReport(@Body() body: creareReportDto) {

    }
}
