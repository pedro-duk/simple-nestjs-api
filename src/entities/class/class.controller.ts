import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClassDTO } from './dto/create-class.dto';
import { UpdateClassDTO } from './dto/update-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';

@ApiTags('class')
@Controller('/class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post()
  async createClass(@Body() classData: CreateClassDTO) {
    const response = await this.classService.createClass(classData);

    return response;
  }

  @Get()
  async getAllClasses() {
    const response = await this.classService.getAllClasses();

    return response;
  }

  @Get('/:internalId')
  async getClassById(@Param('internalId') internalId: string) {
    const response = await this.classService.getClassById(internalId);

    return response;
  }

  @Patch('/:internalId')
  async updateClass(
    @Param('internalId') internalId: string,
    @Body() classUpdateData: UpdateClassDTO,
  ) {
    const response = await this.classService.updateClass(
      internalId,
      classUpdateData,
    );

    return response;
  }

  @Delete('/:id')
  async deleteClass(@Param('id') id: string) {
    const response = await this.classService.deleteClass(id);

    return response;
  }
}
