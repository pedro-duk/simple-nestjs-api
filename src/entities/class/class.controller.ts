import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDTO } from './dto/CreateClass.dto';
import { UpdateClassDTO } from './dto/UpdateClass.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('class')
@Controller('/class')
export class ClassController {
  constructor(private classRepository: ClassRepository) {}

  @Post()
  async createClass(@Body() classData: CreateClassDTO) {
    const currentClass = await this.classRepository.save(classData);

    return {
      class: currentClass,
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

  @Get('/:internalId')
  async getClassById(@Param('internalId') internalId: string) {
    const currentClass =
      await this.classRepository.findByInternalId(internalId);

    if (!currentClass) {
      throw new NotFoundException('Class was not found');
    }

    return {
      class: currentClass,
      message: 'Class found',
    };
  }

  @Patch('/:internalId')
  async updateClass(
    @Param('internalId') internalId: string,
    @Body() classUpdateData: UpdateClassDTO,
  ) {
    const currentClass = await this.classRepository.update(
      internalId,
      classUpdateData,
    );

    if (!currentClass) {
      throw new NotFoundException('Class was not found');
    }

    return {
      updatedClass: currentClass,
      message: 'Class has been updated',
    };
  }

  @Delete('/:id')
  async deleteClass(@Param('id') id: string) {
    const currentClass = await this.classRepository.delete(id);

    if (!currentClass) {
      throw new NotFoundException('Class was not found');
    }

    return {
      deletedClass: currentClass,
      message: 'Class has been deleted',
    };
  }
}
