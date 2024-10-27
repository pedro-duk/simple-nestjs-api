import { Injectable } from '@nestjs/common';
import Class, { IClass } from './class.entity';
import { CreateClassDTO } from './dto/CreateClass.dto';

@Injectable()
export class ClassRepository {
  async save(classData: CreateClassDTO) {
    const newClass = new Class(classData);
    await newClass.save();

    return newClass;
  }

  async findByInternalId(internalId: string) {
    return await Class.findOne({ internalId });
  }

  async update(internalId: string, classUpdateData: Partial<IClass>) {
    return await Class.findOneAndUpdate({ internalId }, classUpdateData, {
      new: true,
    });
  }

  async delete(internalId: string) {
    return await Class.findOneAndDelete({ internalId });
  }

  async findAll() {
    return await Class.find({});
  }
}
