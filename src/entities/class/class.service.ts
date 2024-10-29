import { NotFoundException } from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDTO } from './dto/create-class.dto';
import { UpdateClassDTO } from './dto/update-class.dto';

export class ClassService {
  constructor(private classRepository: ClassRepository) {}

  async createClass(classData: CreateClassDTO) {
    const currentClass = await this.classRepository.save(classData);

    return {
      class: currentClass,
      message: 'Class saved successfully',
    };
  }

  async getAllClasses() {
    const classes = await this.classRepository.findAll();

    return {
      classes,
      message: 'Classes recovered',
    };
  }

  async getClassById(internalId: string) {
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

  async updateClass(internalId: string, classUpdateData: UpdateClassDTO) {
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

  async deleteClass(id: string) {
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
