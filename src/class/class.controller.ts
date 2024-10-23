import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDTO } from './dto/CreateClass.dto';
import { UpdateClassDTO } from './dto/UpdateClass.dto';

@Controller('/classes')
export class ClassController {
  constructor(private classRepository: ClassRepository) {}

  @Post()
  async createClass(@Body() classData: CreateClassDTO) {
    this.classRepository.save(classData);

    return {
      class: classData,
      message: 'Class saved successfully',
    };
  }

  @Get()
  async getAllClasses() {
    const classes = await this.classRepository.findAll();

    return {
      classes,
      message: 'Classes recovered',
    };
  }

  @Get('/:id')
  async getClassById(@Param('id') id: string) {
    const currentClass = await this.classRepository.findById(id);

    return {
      class: currentClass,
      message: 'Class found',
    };
  }

  @Patch('/:id')
  async updateClass(
    @Param('id') id: string,
    @Body() classUpdateData: UpdateClassDTO,
  ) {
    const currentClass = await this.classRepository.update(id, classUpdateData);

    return {
      updatedClass: currentClass,
      message: 'Class has been updated',
    };
  }

  @Delete('/:id')
  async deleteClass(@Param('id') id: string) {
    const currentClass = await this.classRepository.delete(id);

    return {
      deletedClass: currentClass,
      message: 'Class has been deleted',
    };
  }
}
