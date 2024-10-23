import { Injectable } from "@nestjs/common";
import Class, { IClass } from "./class.entity";
import { CreateClassDTO } from "./dto/CreateClass.dto";

@Injectable()
export class ClassRepository {
  async save(classData: CreateClassDTO) {
    const newClass = new Class(classData);
    await newClass.save();
  }

  async findById(classId: string) {
    return await Class.findById(classId);
  }

  async update(classId: string, classUpdateData: Partial<IClass>) {
    return await Class.findOneAndUpdate({ _id: classId }, classUpdateData, {
      new: true,
    });
  }

  async delete(classId: string) {
    return await Class.findByIdAndDelete(classId);
  }

  async findAll() {
    return await Class.find({});
  }
}