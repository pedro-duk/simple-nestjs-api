import mongoose from 'mongoose';

export interface IBook {
  name: string;
  url: string;
}

export const bookSchema = new mongoose.Schema<IBook>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { versionKey: false },
);

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;