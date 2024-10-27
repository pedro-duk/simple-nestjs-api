import mongoose from 'mongoose';

export interface IClass {
  internalId: string;
  name: string;
  grade: string;
  studentEmails: string[];
  bookInternalIds: string[];
}

export const classSchema = new mongoose.Schema<IClass>(
  {
    internalId: { type: String, required: true },
    name: { type: String, required: true },
    grade: { type: String, required: true },
    studentEmails: { type: [String], required: true },
    bookInternalIds: { type: [String], required: true },
  },
  { versionKey: false },
);

const Class = mongoose.model<IClass>('Class', classSchema);

export default Class;
