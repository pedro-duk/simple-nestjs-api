import mongoose from 'mongoose';

export interface IClass {
  name: string;
  grade: string;
  studentIds: string[];
  bookIds: string[];
}

export const classSchema = new mongoose.Schema<IClass>(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    studentIds: { type: [String], required: true },
    bookIds: { type: [String], required: true },
  },
  { versionKey: false },
);

const Class = mongoose.model<IClass>('Class', classSchema);

export default Class;
